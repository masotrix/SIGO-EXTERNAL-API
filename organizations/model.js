export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {
    id: { type: types.TEXT, primaryKey: true },
    name: { type: types.TEXT, allowNull: false },
    description: { type: types.TEXT, allowNull: false },
    region: { type: types.TEXT, allowNull: false },
    comuna: { type: types.TEXT, allowNull: false },
    organizationType: { type: types.TEXT, allowNull: false },
    healthcareService: { type: types.TEXT, allowNull: false },
    deisCode: { type: types.TEXT, allowNull: false },
  }, { timestamps: false });


  schema.associate = MODELS => {
    /*
    schema.hasMany(MODELS.patient, {
        foreignKey: "organizationId"
    });

    schema.hasMany(MODELS.cases, {
        foreignKey: "organizationId"
    });

    schema.hasMany(MODELS.role, {
        foreignKey: "organizationId"
    });
    */

  };

  return schema;
}
