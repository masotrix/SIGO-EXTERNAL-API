export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {

      id: { type: types.TEXT, primaryKey: true },
      category: { type: types.TEXT },
      content: { type: types.TEXT },
      createdAt: { type: types.DATE, allowNull: false,
          defaultValue: types.NOW },
      updatedAt: { type: types.DATE, allowNull: false },
      caseId: { type: types.TEXT, allowNull: false },
      userId: { type: types.TEXT },
      status: { type: types.TEXT,
          allowNull: false, defaultValue: 'ACTIVE' },

  }, { tableName: 'clinical_notes', timestamps: false });


  schema.associate = MODELS => {

    schema.belongsTo(MODELS.cases, {
        foreignKey: "caseId"
    });
  }

  return schema;
}
