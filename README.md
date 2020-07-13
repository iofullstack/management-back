# MANAGEMENT BACK

## Sobre el proyecto

Esta iniciativa nace con el propósito de poder crear diferentes módulos de back-end para funcionalidades de compra y venta, en general.

```js
mongo
>db.createUser({
  user:"dbgary",
  pwd: "passmongo",
  roles:["clusterAdmin","readAnyDatabase","readWriteAnyDatabase","userAdminAnyDatabase","dbAdminAnyDatabase"]
})

>db.units.update({
  _id: ObjectId("5f082382f90b913dde20ac91")
},
{
  $set: {
    conversions: [ ObjectId("5f0cd9403aa4d70f42e963f2") ]
  }
})

mongo --username dbgary --password passmongo --authenticationDatabase admin --host localhost --port 27017
```
