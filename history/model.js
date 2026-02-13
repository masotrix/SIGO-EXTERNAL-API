export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {

    id: { type: types.TEXT, primaryKey: true },
    eventType: { type: types.TEXT, allowNull: false },
    date: { type: types.DATE, allowNull: false,
        defaultValue: types.NOW },
    userId: { type: types.TEXT },
    patientId: { type: types.TEXT },
    caseId: { type: types.TEXT },
    targetOrganizationId: { type: types.TEXT },
    originOrganizationId: { type: types.TEXT },
    previousValue: { type: types.JSONB },
    newValue: { type: types.JSONB },
    reason: { type: types.TEXT },
    observations: { type: types.TEXT },
    fileKey: { type: types.TEXT },

  }, { timestamps: false });


  schema.associate = MODELS => {

    /*
    schema.belongsTo(MODELS.users, {
        foreignKey: "userId"
    });
    */

    schema.belongsTo(MODELS.patients, {
        foreignKey: "patientId"
    });

    schema.belongsTo(MODELS.cases, {
        foreignKey: "caseId"
    });

  }

  return schema;
}
