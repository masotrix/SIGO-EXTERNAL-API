export default (serviceName) => (orm, types) => {
  const schema = orm.define(serviceName, {

    id: { type: types.TEXT, primaryKey: true },
    correlativeId: { type: types.INTEGER,
        allowNull: false, autoIncrement: true },
    organizationId: { type: types.TEXT, allowNull: false },
    patientId: { type: types.TEXT, allowNull: false },
    laterality: { type: types.TEXT },
    clinicalStatus: { type: types.TEXT, allowNull: false },
    administrativeStatus: { type: types.TEXT, allowNull: false },
    patologyCode: { type: types.TEXT, allowNull: false },
    diagnosisDate: { type: types.DATE },
    status: { type: types.TEXT,
        allowNull: false, defaultValue: "OPEN" },
    createdAt: { type: types.DATE,
        allowNull: false, defaultValue: types.NOW },

  }, { updatedAt: false });

  schema.beforeCreate(async (instance, options) => {
      if (orm.getDialect() === "sqlite") {
        const max = await schema.max("correlativeId");
        instance.correlativeId = (max || 0) + 1;
      }
  });

  schema.associate = MODELS => {

    schema.belongsTo(MODELS.organizations, {
        foreignKey: "organizationId"
    });

    schema.belongsTo(MODELS.patients, {
        foreignKey: "patientId"
    });

    /*
    schema.hasMany(MODELS.stagings, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.resolutions, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.tasks, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.sharedCases, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.notifications, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.mandatoryNotifications, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.history, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.clinicalNotes, {
        foreignKey: "caseId"
    });

    schema.hasMany(MODELS.files, {
        foreignKey: "caseId"
    });
    */
  }
  return schema;
}
