## Dudas

- Patient:
  - trackCode: '9' siempre?
- Task
  - Especificar dueDate cuando status COMPLETED ?
- Mandatory Notifications:
  - Notifier name y document number: Obligatorio?
  - diagnosticBasis: 'SOLID\_TUMOR' siempre?
  - examType: 'BIOPSY' siempre?
  - Siguen siendo optativas extensions, tnmprefix y los t n m?
  - sampleCollectionDate optativo?
  - Todo lo demas obligatorio? (era obligatorio en las cargas masivas)
- History
  - En eventos que no son shareCase,
    se usa originOrganization o targetOrganization?

## TODO

- Tasks Exams:
  - Validaciones dias faltantes remainderDaysBefore


- Tests
  - Mandatory Notifications:


# Plan

- Insertar los pacientes nuevos
  - Obtener mapa de ids desde organizaciones antiguas a nuevas
  - Obtener todos los pacientes nuevos
  - Insertar los pacientes en el contexto del mapa de organizaciones
  - Insertar las patologias del paciente (en registros oncologicos)
  - Insertar notificaciones mandatorias

- Crear modelos de base nueva y antigua
  - Crear conexiones a base de datos para probar modelos

- Cargar bases de datos
  - De nueva necesitariamos las organizaciones
    - Podemos por ahora crear una sola usando un mapeo automatico
  - De la antigua usamos archivos CSV que ya tenemos

