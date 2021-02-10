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
tools/./
./smsi-cli -qv -s sub1 qs -q '"SELECT NOW() FROM DUMMY"'

./smsi-cli -s sub1 qs -q '"SELECT NOW() FROM DUMMY"'

// Get List of all tables
./smsi-cli -s sub1 tables

// Get Field details of a specific table
./smsi-cli -s sub1 ti SCHEMA TABLE
./smsi-cli -s sub1 it 5922A2BA0669402BB61AA6065450C660  MY_BOOKSHOP_BOOKS

// List the Top 5 rows of a specific table (in default SCHEMA)
hana-cli qs -q "SELECT ID,TITLE FROM MY_BOOKSHOP_BOOKS LIMIT 4"
hana-cli qs -q "SELECT * FROM MY_BOOKSHOP_BOOKS LIMIT 4"

// SELECT Statements with wildcard * won't work since bash wants to expand them instead of passing through unchanged to hana-cli
./smsi-cli -s sub1 qs -q '"SELECT * FROM MY_BOOKSHOP_BOOKS LIMIT 4"'
// You can avoid * 
./smsi-cli -s sub1 qs -q '"SELECT ID,TITLE FROM MY_BOOKSHOP_BOOKS LIMIT 4"'
// OR you can "wrap" hana-cli invocations with smsi-cli using the -b=backup_files and -r=restore_files flags
./smsi-cli -b -s sub1 ; hana-cli qs -q "SELECT * FROM MY_BOOKSHOP_BOOKS LIMIT 4" ; ./smsi-cli -r -s sub1 

```