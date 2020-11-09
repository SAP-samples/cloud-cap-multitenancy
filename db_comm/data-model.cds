namespace common;
using { User, Country, cuid, managed } from '@sap/cds/common';

entity States {
  key code : String(2);
  abbrev   : String(6);
  name     : String(24);
}

entity Currencies {
  key code  : String(3);
  name      : String(128);
  UperUSD   : Double;
  USDperU   : Double;
}

entity Subscribers : cuid {
  SAChostname            : String(255);
  email                  : String(255);
  globalAccountGUID      : String(64);
  subscribedSubaccountId : String(64);
  subscribedSubdomain    : String(64);
  subscribedTenantId     : String(64);
  subscriptionAppId      : String(64);
  subscriptionAppName    : String(96);
  userId                 : String(64);
}
