const cds = require('@sap/cds');

const { inspect } = require('util');

const axios = require('axios');
const qs = require('qs');

const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const xsenv = require('@sap/xsenv');
const services = xsenv.getServices({
  uaa: { tag: 'xsuaa' },
  registry: { tag: 'SaaS' }
});

console.log("services:" + JSON.stringify(services, null, 2));
console.log("appEnv:" + JSON.stringify(appEnv, null, 2));

async function connectAPI() {
  try {
      // Get Auth Endpoint
      let options1 = {
          method: 'GET',
          url: appEnv.app.cf_api + '/info'
      };
      console.log("options1:" + inspect(options1,false,1));
      let res1 = await axios(options1);
      console.log("res1:" + inspect(res1.data,false,1));
      try {
          // Login + Get Token
          let options2 = {
              method: 'POST',
              url: res1.data.authorization_endpoint + '/oauth/token?grant_type=password',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                  'Authorization': 'Basic Y2Y6'
              },
              data: qs.stringify({
                username: process.env.CF_API_USER,
                password: process.env.CF_API_PW
                //username: 'andrew.lunde@sap.com',
                //password: 'Hi'
          })
          };
          console.log("options2:" + inspect(options2,false,1));
          let res2 = await axios(options2);
          console.log("res2:" + inspect(res2.data,false,1));
          try {
              // Get App Router Module's GUID
              let options3 = {
                  method: 'GET',
                  url: appEnv.app.cf_api + '/v3/apps?organization_guids=' + appEnv.app.organization_id + '&space_guids=' + appEnv.app.space_id + '&names=' + services.registry.appName + '-app',
                  headers: {
                      'Authorization': 'Bearer ' + res2.data.access_token
                  }
              };
              console.log("options3:" + inspect(options3,false,1));
              let res3 = await axios(options3);
              console.log("res3:" + inspect(res3.data,false,1));
              try {
                  // Get Domains
                  let options4 = {
                      method: 'GET',
                      url: appEnv.app.cf_api + '/v3/domains?names=' + /\.(.*)/gm.exec(appEnv.app.application_uris[0])[1],
                      headers: {
                          'Authorization': 'Bearer ' + res2.data.access_token
                      }
                  };
                  console.log("options4:" + inspect(options4,false,1));
                  let res4 = await axios(options4);
                  console.log("res4:" + inspect(res4.data,false,1));
                  let connRes = {
                    'access_token': res2.data.access_token,
                    'application_id': res3.data.resources[0].guid,
                    'domain_id': res4.data.resources[0].guid
                  };
                  console.log("connRes:" + inspect(connRes,false,1));
                  return connRes;
              } catch (err) {
                  console.log(err.stack);
                  return err.message;
              }
          } catch (err) {
              console.log(err.stack);
              return err.message;
          }
      } catch (err) {
          console.log(err.stack);
          return err.message;
      }
  } catch (err) {
      console.log(err.stack);
      return err.message;
  }
};

async function createRoute(tenantHost, connectRes) {
  try {
      // Create Route
      let options1 = {
          method: 'POST',
          url: appEnv.app.cf_api + '/v3/routes/',
          headers: {
              'Authorization': 'Bearer ' + connectRes.access_token,
              'Content-Type': 'application/json'
          },
          data: {
              'host': tenantHost,
              'relationships': {
                  'space': {
                      'data': {
                          'guid': appEnv.app.space_id
                      }
                  },
                  'domain': {
                      'data': {
                          'guid': connectRes.domain_id
                      }
                  }
              }
          }
      }
      console.log("options1:" + inspect(options1,false,1));
      let res1 = await axios(options1);
      console.log("res1:" + inspect(res1.data,false,1));
      try {
          let options2 = {
              method: 'POST',
              url: appEnv.app.cf_api + '/v3/routes/' + res1.data.guid + '/destinations',
              headers: {
                  'Authorization': 'Bearer ' + connectRes.access_token,
                  'Content-Type': 'application/json'
              },
              data: {
                  'destinations': [{
                      'app': {
                          'guid': connectRes.application_id
                      }
                  }]
              }
          };
          console.log("options2:" + inspect(options2,false,1));
          let res2 = await axios(options2);
          console.log("res2:" + inspect(res2,false,1));
          return res2.data;
      } catch (err) {
          console.log(err.stack);
          return err.message;
      }
  } catch (err) {
      console.log(err.stack);
      return err.message;
  };
};

async function deleteRoute(tenantID, connectRes) {
    try {
        // SaaS login + Get Token
        let options0 = {
            method: 'POST',
            url: services.registry.url + '/oauth/token?grant_type=client_credentials&response_type=token',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            auth: {
                username: services.registry.clientid,
                password: services.registry.clientsecret
            }
        };
        console.log("options0:" + inspect(options0,false,1));
        let res0 = await axios(options0);
        console.log("res0:" + inspect(res0.data,false,1));
        try {  
            // SaaS get tenant subscription info (subdomain)
            let options1 = {
                method: 'GET',
                url: services.registry.saas_registry_url + '/saas-manager/v1/application/subscriptions?tenantId=' + tenantID,
                headers: {
                    'Authorization': 'Bearer ' + res0.data.access_token
                }
            }
            console.log("options1:" + inspect(options1,false,1));
            let res1 = await axios(options1);
            console.log("res1:" + inspect(res1.data,false,1));
            let subdomain = res1.data.subscriptions[0].subdomain;

            try {
                // Get routeID with name subdomain-dev-mtxsm-app
                let options2 = {
                    method: 'GET',
                    url: appEnv.app.cf_api + '/v3/apps/' + connectRes.application_id + '/routes?hosts=' + subdomain + '-dev-mtxsm-app',
                    headers: {
                        'Authorization': 'Bearer ' + connectRes.access_token
                    }
                };
                console.log("options2:" + inspect(options2,false,1));
                let res2 = await axios(options2);
                console.log("res2:" + inspect(res2,false,1));
                try {
                    let options3 = {
                        method: 'DELETE',
                        url: appEnv.app.cf_api + '/v3/routes/' + res2.data.resources[0].guid,
                        headers: {
                            'Authorization': 'Bearer ' + connectRes.access_token
                        }
                    };
                    console.log("options3:" + inspect(options3,false,1));
                    let res3 = await axios(options3);
                    console.log("res3:" + inspect(res3,false,1));
                    return res3.data;
                } catch (err) {
                    console.log(err.stack);
                    return err.message;
                };
            } catch (err) {
                console.log(err.stack);
                return err.message;
            };
        } catch (err) {
            console.log(err.stack);
            return err.message;
        };
    } catch (err) {
        console.log(err.stack);
        return err.message;
    };
};


module.exports = (service) => {
  // event handler for returning the tenant specific application URL as a response to an onboarding request
  service.on('UPDATE', 'tenant', async (req, next) => {
    console.log('[INFO ][ON_UPDATE_TENANT] XXX_Starting Subscription for ' + req.data.subscribedSubdomain + '.');
    const res = await next();          // IMPORTANT: call default implementation which is doing the HDI container creation
    let c = cds.env.for('app');        // use cds config framework to read app specific config node
    //let appuri = typeof c.urlpart === "undefined" ? ' ' : c.urlpart;
    let appuri = "-dev-mtxsm-app.cfapps.us10.hana.ondemand.com";

    // assume app router name is same as saas-registry app name & ensure in lowercase & all _ converted to -
    let tenant = req.data.subscribedSubdomain + '-' + appEnv.app.space_name.toLowerCase().replace(/_/g,'-') + '-' + services.registry.appName.toLowerCase().replace(/_/g,'-');
    let tenantHost = tenant + '-app';
    let tenantURL = 'https:\/\/' + tenantHost + /\.(.*)/gm.exec(appEnv.app.application_uris[0])[0];

    console.log("tenantHost:" + tenantHost);
    console.log("tenantURL:" + tenantURL);

    connectAPI().then(
        function (res1) {
            createRoute(tenantHost, res1).then(
                function (res2) {
                    console.log('Subscribe: ', tenantHost, res2);
                    //res.status(200).send(tenantURL);
                    return tenantURL;
                },
                function (err) {
                    console.log(err.stack);
                    //res.status(500).send(err.message);
                    return '';
                });
        },
        function (err) {
            console.log(err.stack);
            //res.status(500).send(err.message);
            return '';
        });

    return tenantURL;

  });

  service.before('DELETE', 'tenant', async (req, next) => {
    console.log("delete req:" + inspect(req.data,false,1));
    console.log('[INFO ][ON_DELETE_TENANT] XXX_Before Unsubscription for ' + req.data.subscribedTenantId + '.');

    //console.log('[INFO ][ON_DELETE_TENANT] XXX_Starting Unsubscription for ' + req.body.subscribedSubdomain + '.');
    // Do this on DELETE, not before DELETE
    //const res = await next();          // IMPORTANT: call default implementation which is doing the HDI container creation
    let c = cds.env.for('app');        // use cds config framework to read app specific config node
    //let appuri = typeof c.urlpart === "undefined" ? ' ' : c.urlpart;
    let appuri = "-dev-mtxsm-app.cfapps.us10.hana.ondemand.com";

    //let tenant = req.body.subscribedSubdomain + '-' + appEnv.app.space_name.toLowerCase().replace(/_/g,'-') + '-' + services.registry.appName.toLowerCase().replace(/_/g,'-');
    //let tenantHost = tenant + '-app';
    let tenantID = req.data.subscribedTenantId;

    connectAPI().then(
      function (res1) {
          deleteRoute(tenantID, res1).then(
              async function (res2) {
                  console.log('Unsubscribe: ', + inspect(res2,false,1));
                  //res.status(200).send('');
                  //await next();
                  return tenantID;
              },
              function (err) {
                  console.log(err.stack);
                  //res.status(500).send(err.message);
                  return '';
              });
      },
      function (err) {
          console.log(err.stack);
          //res.status(500).send(err.message);
          return '';
      });

  });

  service.on('DELETE', 'tenant', async (req, next) => {
    console.log("delete req:" + inspect(req.data,false,1));
    console.log('[INFO ][ON_DELETE_TENANT] XXX_On Unsubscription for ' + req.data.subscribedTenantId + '.');

    //console.log('[INFO ][ON_DELETE_TENANT] XXX_Starting Unsubscription for ' + req.body.subscribedSubdomain + '.');
    const res = await next();          // IMPORTANT: call default implementation which is doing the HDI container creation
    let c = cds.env.for('app');        // use cds config framework to read app specific config node
    //let appuri = typeof c.urlpart === "undefined" ? ' ' : c.urlpart;
    let appuri = "-dev-mtxsm-app.cfapps.us10.hana.ondemand.com";

    //let tenant = req.body.subscribedSubdomain + '-' + appEnv.app.space_name.toLowerCase().replace(/_/g,'-') + '-' + services.registry.appName.toLowerCase().replace(/_/g,'-');
    //let tenantHost = tenant + '-app';
    let tenantID = req.data.subscribedTenantId;

    return tenantID;

  });
}
