# Yeoman Recipe for the project sample

## Yeoman is installed in the Business Application Studio or install it locally with..
```
npm install -g yo
```

## Install this exact version of the partner engineering yeoman generator

```
npm install -g generator-sap-partner-eng@0.3.0
```

## Verify generator version (if already installed)

```
npm ls -g --depth=0 generator-sap-partner-eng
```

    generator-sap-partner-eng@0.3.0

## Run the yeoman generator to create the project folder and approuter

```
yo sap-partner-eng
```
!(images/842229F4-C86E-4072-AEA3-A8B1BC2D0301.png)
```
     _-----_     ╭──────────────────────────╮
    |       |    │    Welcome to the SAP    │
    |--(o)--|    │    Partner Engineering   │
   `---------´   │    project generator!    │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |    
   __'.___.'__   
 ´   `  |° ´ Y ` 
After you've generated your base MTA project you can enhance it with the following subgenerators.
 npx --node-arg=--inspect yo sap-partner-eng:subgen
Add Jenkins support with           "?yo sap-partner-eng:jenkins"
Add Deploy to XSA extension with   "?yo sap-partner-eng:deploy2xsa"
Add a Manually managed schema with "?yo sap-partner-eng:db-sch"
Add a HDB-style HDI container with "?yo sap-partner-eng:db-hdb"
Add a CAP-style HDI container with "yo sap-partner-eng:db-cap"
Add a HANA SecureStore with        "?yo sap-partner-eng:db-ss"
Add a NodeJS based module with     "yo sap-partner-eng:module-nodejs"
Add a Java based module with       "?yo sap-partner-eng:module-java"
Add a Python based module with     "?yo sap-partner-eng:module-python"
Add a Docker based module with     "?yo sap-partner-eng:module-docker"
* = This module is not yet available or is in developoment.  YMMV.
? Enter your project folder name (will be created if necessary). cloud-cap-multitenancy
? Enter your project application name (will be used for defaults). capmt
? Enter your project application description. Cloud Application Programming(CAP) with Multitenancy using Service Manger Tenant Data Separati
on
? Application router internal module name. capmt-app
This list of domain names is based on the current 'cf domains' command.
 Domain name. cfapps.us10.hana.ondemand.com
? Application router path app
? Domain/Database model path db
? Services definition path srv
? UAA resource name capmt-uaa
? UAA service name CAPMT_UAA
Your project must be inside a folder named cloud-cap-multitenancy
C02XN22LJGH6:git i830671$ cd cloud-cap-multitenancy/
C02XN22LJGH6:cloud-cap-multitenancy i830671$ yo sap-partner-eng:db-cap
Start Prompting.
What is: foo!
Using app_name: capmt
Using router_name: capmt-app
Using router_path: app
Using database_path: db
Using services_path: srv
? DB Module Name. capmt-hdb
Leave this blank if you want the system to generate the schema name.
 DB Schema Name. 
? HDI resource name capmt-hdi
Implement the service module as nodejs/(java) module type.
 Module type. nodejs
? HDI service name. CAPMT_HDI
? Services Module Name. capmt-srv
? Services Module API (Internal Reference). capmt_svc_api
? Services Module Back End (AppRouter Destination). capmt_svc_be
? Route path(after first /) that your module will handle catalog
? Use this NodeJS module to handle CDS-MTX style subscription requests? Yes
? Registry Resource Name. capmt-reg
? Registry Service Name. CAPMT_REG
? Managed(HDI) Resource Name. capmt-smc
? Managed(HDI) Service Name. CAPMT_SMC
Using domain_name: cfapps.us10.hana.ondemand.com
Using uaa_res_name: capmt-uaa
```
