## TODO

- Tasks Treatments
- Staging
- Transfer staging
- Patient
  - Comunes systematic, contry code, nationalities, Phone2, ecogen?
- Access? File? User? Exam? Notification? ScheduledNotif? 
  Role? TaskHistory?


## Dudas

- Patient:
  - trackCode: '9' siempre?
  - ecogStage: 0-5 revisar
- Case
  - Case solo puede ser creado por organizacion a la que esta
    asociado un paciente, o tambien puede una que tiene un shared
    case en ese momento?
    - En el case, se especifica la organizacion que la creo en
      organizationId, o la que esta asociada a su paciente?
    + Se valida no la asociacion del paciente a la organizacion,
      sino que se busca al paciente,


  - Al cambiar el administrative status, no estoy permitiendo cambiarlo
    a CASE\_CLOSED (pero si desde), a menos que la operación sea
    cerrar el caso, para lo que tiene que usar un endpoint distinto
    para cerrar el caso, lo que genera un evento distinto
    - Esto está bien para los estados DIAGNOSIS, STAGING, TREATMENT y
      SURVEILLANCE? No requeriria el cambio a estos estados añadir
      MandatoryNotifications, o Stagings, o Task de treatment en la
      consulta, para que sean "atómicas" las operaciones?
- Stagings
  - Que son? Debo crear endpoints?
- ComiteResolution
  - Debo generar endpoints?
  - Lo que hice en la migracion solo incluia fecha y el
    id de la resolucion, ningún otro campo Deberia añadir otros?
- History
  - En eventos que no son shareCase,
    se usa originOrganization o targetOrganization?
  - Cuando deberia usar el campo reason
  - Cuando deberia permitir recibir observaciones?
  - Cerrar el caso por administrativeStatus 'CASE\_CLOSED'
    (event\_type.EDIT\_ADMINISTRATIVE\_STATUS es separado de
    cerrarlo por status 'CLOSED' (event\_type.CLOSE\_CASE)
  - En que momentos deberia usar reason, fileKey
  - No deberia haber una referencia a sharedCaseId para referenciar
    un sharedKey que esta siendo confirmado?
    - Parece que se usa originOrganization y targetOrganization,
      pero parece que se vuelve un poco mas dificil la trazabilidad
      de lo que ocurre con los sharedCases especificos
- Mandatory Notifications:
  - Notifier name y document number: Obligatorio?
  - diagnosticBasis: 'SOLID\_TUMOR' siempre? (HEMATOLOGIC | IMAGING)
  - examType: 'BIOPSY' siempre? (nunca por ahora LABORATORY | REPORT )
    - Cambian otros campos?
  - Siguen siendo optativas extensions, tnmprefix y los t n m?
  - sampleCollectionDate optativo?
  - Todo lo demas obligatorio? (era obligatorio en las cargas masivas)
- File
  - Deberia añadir endpoints? (entiendo que lo estandar es que se suban
    a traves de la app frontend, pero quizas...)
- Task
  - Especificar dueDate cuando status COMPLETED ?
- SharedCase
  - Quien inicia el sharedcase, la organizacion de
    origen o la de destino
  - Hay 3 organizaciones, organizationId, originOrganization y
    requesterOrganization
  - Al crear el sharedcase, lo pongo en estado PENDING
  - Solo estoy permitiendo el endpoint para confirm si antes era PENDING
  - El endpoint de Confirm, estoy usandolo tanto para CONFIRM como para
    REJECT, y en ambos estoy usando history eventType "CONFIRM\_SHARE",
    porque no encontre el evento de rechazar (REJECT\_SHARE)
  - Un establecimiento que tiene compartido un caso, puede compartirlo?
  - Como funciona el unshare case? se elimina el sharedcase?
    No podria "cerrarse" sharecase para que quede registro?
- Exam
  - Crear endpoints? Permitir todos los campos?
- Notification
  - Deberia crear notificaciones en los eventos de la api?
  - Cuando uso notificaciones normales y cuando sheduled notifications
- Transfer patient y Receive patient
  - Ver relacion sugeriada por tipos de eventos en el historial
  - Que son?
  - Transfer staging?
  - Es cambiar la organizacion del paciente 
- Request access, Adhere to case y reject access
  - Que son?
  - Otras formas de share case?
- Role
  - Debo crear endpoints para crear roles?
  - Deben haber reglas que verifiquen role de un usuario
    antes de permitirlas
  - Por ejemplo que el usuario especificado tiene un rol dado en
    la organizacion especificada en la operacion
- Organization
  - Permitir crear/consultar por organizaciones?
- Usuarios
  - Debo crear endpoints para crear usuarios?
  - Todas las endpoints que tienen userId debería especificar el userId?
- Task History
  - Implementar? Especificar usuario que realizó acción


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

