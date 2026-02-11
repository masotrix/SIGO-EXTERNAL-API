import { Sequelize } from "sequelize";

const getOldPatients = async (oldModels, offset) => {

    return await oldModels.OncologyPatient.findAll({
	//limit: 25,
	limit: 1000,
	//where: { id: { [Sequelize.Op.in]: [113272] } }, // 17012851-6
        offset,
        raw: false,
        nest: true,
        include: [
          { model: oldModels.Organization, as: 'organization' },
          {
             model: oldModels.Patient,
             as: 'patient',
             include: [
               { model: oldModels.Organization, as: 'organization' },
               { model: oldModels.DocumentType, as: 'documentType' },
               { model: oldModels.BiologicalSex, as: 'biologicalSex' },
               { model: oldModels.GenderIdentity, as: 'genderIdentity' },
               { model: oldModels.Nationality, as: 'nationality' },
               { model: oldModels.Region, as: 'region' },
               { model: oldModels.Commune, as: 'commune' },
               { model: oldModels.Province, as: 'province' },
               { model: oldModels.Prevision, as: 'prevision' },
             ]
          },
          {
              model: oldModels.OncologyRegister,
              as: 'registers',
              /*
              required: true,
              where: {
                oncologyDiagnosticConfirmId: {
                  [Sequelize.Op.ne]: null
                }
              },
              */
              include: [
                  {
                      model: oldModels.OncologyPatology,
                      as: 'patology',
                  },
                  {
                      model: oldModels.ClosureType,
                      as: 'closureType',
                  },
                  {
                      model: oldModels.Organization,
                      as: 'organizations',
                  },
                  /*
                  {
                      model: oldModels.OncologyRegisterTest,
                      as: 'tests',
                      include: [
                        {
                            model: oldModels.OncologyTest,
                            as: 'test',
                        },
                      ],
                  },
                  */
                  {
                      model: oldModels.OncologyRegisterGeneralTest,
                      as: 'generalTests',
                      include: [
                        {
                            model: oldModels.OncologyGeneralTest,
                            as: 'generalTest',
                        },
                      ],
                  },

                  {
                      model: oldModels.OncologyRegisterCommittee,
                      as: 'committees',
                  },
                  {
                      model: oldModels.OncologyDocument,
                      as: 'documents',
                      include: [
                        {
                            model: oldModels.OncologyDocumentCategory,
                            as: 'category',
                        },
                        {
                            model: oldModels.Agent,
                            as: 'agent',
                        },
                      ],
                  },
                  {
                      model: oldModels.OncologyRegisterTreatment,
                      as: 'treatments',
                      include: [
                        {
                            model: oldModels.OncologyTreatment,
                            as: 'treatment',
                        },
                      ],
                  },
                  {
                      model: oldModels.OncologyHistoric,
                      as: 'historics',
                      include: [
                        {
                          model: oldModels.OncologyHistoricStage,
                          as: 'historicStages',
                          include: [
                            {
                              model: oldModels.OncologyStage,
                              as: 'stage',
                            }
                          ]
                        },
                        {
                          model: oldModels.OncologyHistoricTreatment,
                          as: 'treatments',
                          include: [
                            {
                              model: oldModels.OncologyTreatment,
                              as: 'treatment',
                            },
                          ],
                        },
                        {
                          model: oldModels.OncologyHistoricCommittee,
                          as: 'committees',
                        },
                        {
                          model: oldModels.OncologyHistoricGeneralTest,
                          as: 'generalTests',
                          include: [
                            {
                              model: oldModels.OncologyGeneralTest,
                              as: 'generalTest',
                            },
                          ],
                        },
                      ],
                  },
                  {
                      model: oldModels.OncologyDiagnosticConfirm,
                      as: 'diagnosticConfirm',
                      include: [
                        {
                          model: oldModels.OncologyDiagnosticConfirmSolid,
                          as: 'confirmSolids',
                          include: [
                            {
                                model: oldModels.OncologyLateraly,
                                as: 'laterality'
                            },
                            {
                                model: oldModels.OncologyTopography,
                                as: 'topography',
                            },
                            {
                                model: oldModels.OncologyMorphologic,
                                as: 'morphology'
                            },
                            {
                                model: oldModels.OncologyBehavior,
                                as: 'behavior'
                            },
                            {
                                model: oldModels.OncologyExtension,
                                as: 'extension'
                            },
                            {
                                model: oldModels.OncologyGrade,
                                as: 'grade'
                            },
                            {
                                model: oldModels.OncologyTnmPrefix,
                                as: 'tnmPrefix'
                            },
                            {
                                model: oldModels.OncologyTnmT,
                                as: 'tnmT'
                            },
                            {
                                model: oldModels.OncologyTnmN,
                                as: 'tnmN'
                            },
                            {
                                model: oldModels.OncologyTnmM,
                                as: 'tnmM'
                            },
                          ],
                        }
                      ]
                  },
              ],
          },
        ]
    });
}

export default getOldPatients;

