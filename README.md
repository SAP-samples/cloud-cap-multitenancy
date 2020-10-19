<!--
SPDX-FileCopyrightText: 2020 Andrew Lunde <andrew.lunde@sap.com>

SPDX-License-Identifier: Apache-2.0
-->
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/cloud-sfsf-benefits-ext)](https://api.reuse.software/info/github.com/SAP-samples/cloud-sfsf-benefits-ext)

# Cloud CAP Multitenancy

Cloud Application Programming(CAP) Node.JS sample code project with multitenancy using service manager created HANA containers for tenant data isolation.  

## Description

This repository contains a complete Multi-Target Application (MTA) sample project that is an example of using the SAP Cloud Application Programming(CAP) approach and it's multitenancy support library to provide true enterprise multitenant application.

There are many disparate pieces of information found throughout the SAP documentation as well as the CAP centric documentation, but it is difficult to bring them together as a cohesive whole.  This sample code project provides a good starting point for those wanting to build a best-practice multitenant enterprise application on SAP Cloud Platform.

This project is implemented completely in the Node.JS programming language.  A java programing language multitenant sample code project can be found at [https://github.com/SAP-samples/cloud-cap-samples-java](https://github.com/SAP-samples/cloud-cap-samples-java).  See the [Demonstrated Features](https://github.com/SAP-samples/cloud-cap-samples-java#demonstrated-features) section of the README.
 
## Requirements

 - An [SAP Cloud Platform account](https://account.hana.ondemand.com/) or [SAP Cloud Platform Trial account](https://account.hanatrial.ondemand.com/cockpit)

 - Quota for HaaS, Application Runtime, SaaS, and Service Manager
 
 ## Download and Installation

 - Clone this repo [https://github.com/SAP-samples/cloud-cap-multitenancy.git](https://github.com/SAP-samples/cloud-cap.multitenancy.git) into your local system or IDE of choice.

 - Modify the mta.yaml to specify your specific CloudFoundry Credentials configuration (optional).

 ```
modules:
 - name: capmt-srv
   type: nodejs
   path: srv
...
   properties:
      CF_API_USER: user@domain.com
      CF_API_PW: xxxxxx
...
```
 - OR - after deployment, 
 1. Create a file called .env with the following.
```
CF_API_USER=<Your User>
CF_API_PW=<Your Password>
```
 2. Run this command to set the ENVIRONMENT with your specifics.
```
set -o allexport; source .env; set +o allexport
```
 
 3. Update the environment for the capmt-srv module in the CF_CDEDS.sh script.
```
cf set-env capmt-srv CF_API_USER $CF_API_USER
cf set-env capmt-srv CF_API_PW $CF_API_PW
cf restage capmt-srv
```

## Project Structure

File / Folder | Purpose
---------|----------
`README.md` | this getting started guide
`COMMANDS.md` | commands for building/deploying 
`app/` | content for UI frontends go here
`db/` | database definitions go here
`documentation/` | supplemental documentation
`srv/` | your service module code goes here
`mta.yaml` | project structure and relationships
`package.json` | project metadata and configuration

## Instructions

Replace **<landscape>.hana.demand.com** with the landscape region variant for your account. 

See the [COMMANDS](COMMANDS.md) file for commands for building and deploying the project.



## Known Issues

This example project contains no known issues.

## Limitations

The creation and assignment of Roles to Roll Collections and the assignment of Roll Collections is limited to global accounts with "Feature Set B".


## How to obtain support

[Create an issue](https://github.com/SAP-samples/cloud-cap-multitenancy/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html?additionalTagId=723714486627645412834578565527550).
 
## Documentation

See the Multitenancy section under Cookbook in the CAP documentation.  [Multitanancy](https://cap.cloud.sap/docs/guides/multitenancy)

Also the broader public [CAP Documentation](https://cap.cloud.sap/docs/).



## Reporting Problems and Contributing Enhancements

An SAP Code Sample such as this is open software but is not quite a typical full-blown open source project. If you come across a problem, we’d encourage you to check the project’s [issue tracker](https://github.com/SAP-samples/cloud-cap-multitenancy/issues) and to [file a new issue](https://github.com/SAP-samples/cloud-cap-multitenancy/issues/new) if needed. If you are especially passionate about something you’d like to improve, you are welcome to fork the repository and submit improvements or changes as a pull request.


## To-Do (upcoming changes)

Tools used throughout the development of this project are evolving and my change over time. This may result in discrepancies in the exact procedures or screen-clips in the accompanying blog posts. All efforts will be made to update the content in order to keep pace with the tooling, but cannot be guaranteed.


## Learn more...

Learn more in the CAP documentation at [CAPIRE](https://cap.cloud.sap/docs/)

A blog post discussing this code sample can be found on SAP Community. 

See: [Getting your head into Cloud Application Programming model multitenancy](https://blogs.sap.com/2020/08/20/getting-your-head-into-cloud-application-programming-model-multitenancy/) for a detailed discussion.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
