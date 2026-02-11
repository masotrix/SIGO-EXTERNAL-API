export default (serviceName) => (orm, types) => {

  const schema = orm.define(serviceName, {
    id: { type: types.TEXT, primaryKey: true },
    organizationId: { type: types.TEXT, allowNull: false },
    documentNumber: { type: types.TEXT,
        allowNull: false, unique: true },
    documentTypeCode: { type: types.TEXT, allowNull: false },
    names: { type: types.TEXT, allowNull: false },
    lastName: { type: types.TEXT, allowNull: false },
    secondLastName: { type: types.TEXT },
    socialName: { type: types.TEXT },
    bornDate: { type: types.DATE },
    isDeceased: { type: types.BOOLEAN, defaultValue: false },
    biologicalSexCode: { type: types.TEXT },
    genderCode: { type: types.TEXT },
    nationalityCode: { type: types.TEXT },
    regionCode: { type: types.TEXT },
    communeCode: { type: types.TEXT },
    provinceCode: { type: types.TEXT },
    forecastCode: { type: types.TEXT },
    trackCode: { type: types.TEXT, allowNull: false },
    countryCode: { type: types.TEXT },
    address: { type: types.TEXT },
    addressNumber: { type: types.TEXT },
    addressInfo: { type: types.TEXT },
    phoneNumber: { type: types.TEXT },
    phoneNumber2: { type: types.TEXT },
    email: { type: types.TEXT },
    spFullName: { type: types.TEXT },
    spPhoneNumber: { type: types.TEXT },
    spEmail: { type: types.TEXT },
    ecogStage: { type: types.TEXT },

  }, { updatedAt: false });


  schema.associate = MODELS => {
    schema.belongsTo(MODELS.organizations, {
        foreignKey: "organizationId"
    });

    /*
    schema.hasMany(MODELS.cases, {
        foreignKey: "patientId"
    });

    schema.hasMany(MODELS.history, {
        foreignKey: "patientId"
    });
    */
  }

  return schema;
}
