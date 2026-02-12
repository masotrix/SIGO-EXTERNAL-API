export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {
    id: { type: types.TEXT, primaryKey: true },
    caseId: { type: types.TEXT, allowNull: false },
    diagnosticBasis: { type: types.TEXT, allowNull: false },
    examType: { type: types.TEXT, allowNull: false },
    topographyGroup: { type: types.TEXT, allowNull: false },
    topographyCode: { type: types.TEXT, allowNull: false },
    topographyDescription: { type: types.TEXT, allowNull: false },
    morphology: { type: types.TEXT, allowNull: false },
    behavior: { type: types.TEXT, allowNull: false },
    extension: { type: types.TEXT },
    differentiationGrade: { type: types.TEXT },
    stagingPrefix: { type: types.TEXT },
    t: { type: types.TEXT },
    n: { type: types.TEXT },
    m: { type: types.TEXT },
    comments: { type: types.TEXT },
    //sampleCollectionDate: { type: types.DATE, allowNull: false },
    sampleCollectionDate: { type: types.DATE },
    resultDate: { type: types.DATE, allowNull: false },
    //notifierName: { type: types.TEXT, allowNull: false },
    notifierName: { type: types.TEXT },
    notifierDocumentNumber: { type: types.TEXT, allowNull: false },
    organizationId: { type: types.TEXT, allowNull: false },
    pdfStorageKey: { type: types.TEXT },
    createdAt: { type: types.DATE,
        allowNull: false, defaultValue: types.NOW },

  }, { timestamps: false });


  schema.associate = MODELS => {
    schema.belongsTo(MODELS.cases, {
        foreignKey: "caseId"
    });

    /*
    schema.hasMany(MODELS.exams, {
      foreignKey: "mandatoryNotificationId"
    });

    schema.hasMany(MODELS.files, {
      foreignKey: "mandatoryNotificationId"
    });
    */
  }

  return schema;
}
