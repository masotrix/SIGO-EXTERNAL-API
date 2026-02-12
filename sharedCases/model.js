export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {

    id: { type: types.TEXT, primaryKey: true },
    caseId: { type: types.TEXT, allowNull: false },
    organizationId: { type: types.TEXT, allowNull: false },
    originOrganizationId: { type: types.TEXT, allowNull: false },
    fileKey: { type: types.TEXT },
    reason: { type: types.TEXT },
    observations: { type: types.TEXT },
    createdAt: { type: types.DATE,
        allowNull: false, defaultValue: types.NOW },
    createdBy: { type: types.TEXT },
    status: { type: types.TEXT, allowNull: false,
        defaultValue: 'ACTIVE' },
    confirmedBy: { type: types.TEXT },

  }, { timestamps: false });


  schema.associate = MODELS => {

    schema.belongsTo(MODELS.organizations, {
        foreignKey: "organizationId"
    });

    schema.belongsTo(MODELS.organizations, {
        foreignKey: "originOrganizationId"
    });

    schema.belongsTo(MODELS.cases, {
        foreignKey: "caseId"
    });

  }

  return schema;
}
