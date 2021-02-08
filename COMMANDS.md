#### Commands for Build/Deploy to Cloud Foundry(Shared Mode):

# Build Command:
```
cd cloud-cap-multitenancy ; mkdir -p mta_archives ; mbt build -p=cf -t=mta_archives --mtar=capmt.mtar
```

# Deploy Command:
```
cf deploy mta_archives/capmt.mtar -f
```

# Subsequent Build+Deploy Commands:
```
mbt build -p=cf -t=mta_archives --mtar=capmt.mtar ; cf deploy mta_archives/capmt.mtar -f ; ./CF_CREDS.sh
```

# Undeploy Command:
```
cf undeploy capmt -f --delete-services
```

```
cf de capmt-rtc
cat default-env.json | jq . > default-env.jsonx ; cp default-env.jsonx default-env.json ; rm -f default-env.jsonx
hana-cli status
hana-cli querySimple -q "SELECT * FROM MY_BOOKSHOP_BOOKS LIMIT 3"
```

```
tools/smsi-cli -s sub1 tables
tools/smsi-cli -qv -s sub1 qs -q '"SELECT NOW() FROM DUMMY"'
```