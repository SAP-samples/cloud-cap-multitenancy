# Subscription Issues

Remember that for your app to be made subscribable, it has to be registered with an app name that is unique in the landscape.  
This holds true also if you want to deploy your app in another space or org within your account.


Service operation failed: Controller operation failed: 502 Updating service "CAPMT_REG" failed: Bad Gateway: Error creating service "CAPMT_REG" from offering "saas-registry" and plan "application": CF-ServiceBrokerBadResponse(10001): Service broker error: Service broker saas-registry failed with: SaaS application/service with the same appName (its value is: capmt) already registered in SaaS 
Proceeding with automatic retry... (3 of 3 attempts left)

```
 - name: capmt-reg
   type: org.cloudfoundry.managed-service
   requires:
    - name: capmt-uaa
   parameters:
      service: saas-registry
      service-plan: application
      service-name: CAPMT_REG
      config:
         xsappname: ~{capmt-uaa/XSAPPNAME}
         appName: capmt-acl
         displayName: capmt
         description: 'capmt Multitenant App'
```


C02XN22LJGH6:mt i830671$ cf app capmt-srv | grep routes
routes:            ap-capmt-prov-dev-capmt-srv.cfapps.ap10.hana.ondemand.com
C02XN22LJGH6:mt i830671$ cf env capmt-srv | grep onSubscription
     "appUrls": "{\"getDependencies\":\"\",\"onSubscription\":\"https://ap-capmt-prov-dev-capmt-srv.cfapps.ap10.hana.ondemand.com/mtx/v1/provisioning/tenant/{tenantId}\",\"onSubscriptionAsync\":false,\"onUnSubscriptionAsync\":false,\"callbackTimeoutMillis\":0}",


