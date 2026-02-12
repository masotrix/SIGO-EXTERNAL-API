export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {

    id: { type: types.TEXT, primaryKey: true },
    caseId: { type: types.TEXT, allowNull: false },
    name: { type: types.TEXT, allowNull: false },
    administrativeStatus: { type: types.TEXT },
    startDate: { type: types.DATE },
    dueDate: { type: types.DATE },
    reminderDaysBefore: { type: types.INTEGER },
    status: { type: types.TEXT, allowNull: false },
    label: { type: types.TEXT },
    comments: { type: types.TEXT },
    responsibleOrganizationId: { type: types.TEXT },
    resolutionId: { type: types.TEXT },
    createdAt: { type: types.DATE,
        allowNull: false, defaultValue: types.NOW },

  }, { updatedAt: false });


  schema.associate = MODELS => {

    schema.belongsTo(MODELS.cases, {
        foreignKey: "caseId",
    });

    schema.belongsTo(MODELS.organizations, {
        foreignKey: "responsibleOrganizationId",
    });

    /*
    schema.belongsTo(MODELS.resolutions, {
        foreignKey: "resolutionId",
    });
    */
  };

  return schema;
}
