export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {
    id: { type: types.TEXT, primaryKey: true },
    correlativeId: { type: types.INTEGER,
        allowNull: false, autoIncrement: true },

    //caseId: { type: types.TEXT, allowNull: false },
    caseId: { type: types.TEXT },

    presentationType: { type: types.TEXT },
    resolutionId: { type: types.TEXT },
    treatmentStarted: { type: types.TEXT },
    treatmentType: { type: types.TEXT },
    comiteDate: { type: types.TEXT },
    comiteMode: { type: types.TEXT },
    comiteType: { type: types.TEXT },
    comments: { type: types.TEXT },
    treatmentIntention: { type: types.TEXT },
    telecomiteId: { type: types.TEXT },
  }, { timestamps: false });

  schema.beforeCreate(async (instance, options) => {
    if (orm.getDialect() === "sqlite") {
      const max = await schema.max("correlativeId");
      instance.correlativeId = (max || 0) + 1;
    }
  });


  schema.associate = MODELS => {
    schema.belongsTo(MODELS.cases, {
        foreignKey: "caseId"
    });

    /*
    schema.hasMany(MODELS.activities, {
        foreignKey: "resolutionId"
    });
    */

    schema.hasMany(MODELS.tasks, {
        foreignKey: "resolutionId"
    });

    /*
    schema.hasMany(MODELS.files, {
        foreignKey: "resolutionId"
    });
    */

  }

  return schema;
}
