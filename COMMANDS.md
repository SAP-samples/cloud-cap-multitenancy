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

# Helpful
```
cf logs capmt-srv | rainbow --background-cyan=XXX_HDI-DEPLOY-OUTPUT --background-yellow=HDI-DEPLOY-OUTPUTHDI-DEPLOY-OUTPUT
```
