export const modulesData = [
  {
    id: 1,
    name: "Módulo 1: Transparencia y Acceso a la Información Ambiental",
    description: "Evaluación de transparencia y acceso a información",
    order_index: 1,
  },
  {
    id: 2,
    name: "Módulo 2: Participación Ciudadana, Control Social y Toma de Decisiones Ambientales",
    description: "Evaluación de participación ciudadana",
    order_index: 2,
  },
  {
    id: 3,
    name: "Módulo 3: Participación ciudadana en la toma de decisiones ambientales",
    description: "Evaluación de participación en decisiones",
    order_index: 3,
  },
]

export const responseOptionsData = [
  { id: 1, option_text: "Sí - Básico", points: 1, excludes_from_calculation: false },
  { id: 2, option_text: "Sí - Intermedio", points: 2, excludes_from_calculation: false },
  { id: 3, option_text: "Sí - Avanzado", points: 3, excludes_from_calculation: false },
  { id: 4, option_text: "No", points: 0, excludes_from_calculation: false },
  { id: 5, option_text: "No aplica", points: 0, excludes_from_calculation: true },
]

export const questionsData = [
  {
    id: 1,
    module_id: 1,
    question_text: "1. Actualizamos el menu transparencia y acceso a la información de manera mensual",
    question_type: "statement" as const,
    order_index: 1,
    recommendations: {
      "Sí - Básico":
        "Creen un documento sencillo y claro (como una guía, procedimiento, instructivo o protocolo) que explique cómo se debe publicar y mantener actualizada la información ambiental de acuerdo con lo que establecen el artículo 9 de la Ley 1712 de 2014 y la Resolución 1519 de 2020.",
      "Sí - Intermedio":
        "Revisen y actualicen el esquema de publicación para asegurar que incluya la información ambiental actualizada y relevante. Además, definan un sistema práctico que permita revisar periódicamente la página web y activar alertas internas para identificar a tiempo cualquier dato desactualizado.",
      "Sí - Avanzado":
        "Verifiquen de forma periódica el cumplimiento de los requisitos establecidos en la Resolución 1519 de 2020 y continúen con el proceso de validación y actualización de la información ambiental publicada en la página web según su protocolo, guía, instructivo o procedimiento insitucional. Además de mantener la información al día, incorporen mejoras que faciliten su comprensión y acceso, como el uso de lenguaje claro, formatos accesibles, y la traducción de contenidos relevantes a dialectos o lenguas propias del territorio, entre otras buenas prácticas.",
      No: "¡ALERTA! La normatividad vigente relacionada con el acceso a la información pública e información ambiental (Ley 1712 de 2014, Resolución 1519 de 2020 y Acuerdo de Escazú) regulan derechos de acceso, por tanto son de obligatorio cumplimiento. Definan una ruta o plan de trabajo que permita avanzar en su cumplimiento de manera organizada.",
      "No aplica":
        "¡ALERTA! La normatividad vigente relacionada con el acceso a la información pública e información ambiental (Ley 1712 de 2014, Resolución 1519 de 2020 y Acuerdo de Escazú) regulan derechos de acceso, por tanto son de obligatorio cumplimiento. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 2,
    module_id: 1,
    question_text: "2. Actualizamos el menu participa de manera mensual",
    question_type: "statement" as const,
    order_index: 2,
    recommendations: {
      "Sí - Básico":
        "Revisen los requisitos establecidos en la Resolución 1519 de 2020 para el menú \"Participa\" y realicen los ajustes necesarios en la página web para asegurar su cumplimiento. Socialicen estos lineamientos con las áreas responsables responsables de promover la participación ciudadana y definan, de forma conjunta, criterios que garanticen la publicación oportuna y clara de la información ambiental relacionada.",
      "Sí - Intermedio":
        "Establezcan un sistema claro y práctico para la actualización de la información ambiental en el menú \"Participa\", a través de un protocolo, procedimiento o instructivo que defina cómo y cuándo las áreas responsables de promover la participación en su entidad, deben remitir la información correspondiente para su publicación. Aseguren la socialización de este sistema con los equipos involucrados y desarrollen espacios de capacitación para fortalecer su implementación.",
      "Sí - Avanzado":
        "Continúen con la actualización periódica y oportuna de los espacios, actividades y contenidos que promueven la participación ciudadana ambiental, como convocatorias, espacios de diálogo, talleres e informes. Incorporen los resultados de estas actividades, la visibilización de compromisos asumidos, el seguimiento realizado, el uso de datos abiertos y la publicación de informes en lenguaje claro. Aseguren también mecanismos que permitan a la ciudadanía brindar retroalimentación sobre estos procesos.",
      No: "¡ALERTA! La normatividad vigente exige actualizar de manera periódica y oportuna de los espacios, actividades y contenidos que promueven la participación ciudadana ambiental. Establezcan un cronograma de actualización mensual del menú \"Participa\", en cumplimiento del Decreto 1499 de 2017, la Resolución 1519 de 2020, los lineamientos de Gobierno Digital y el Acuerdo de Escazú. Aseguren que esta actualización impulse mecanismos efectivos de participación ciudadana.",
      "No aplica":
        "¡ALERTA! La normatividad vigente relacionada con el acceso a la información para la participación ambiental (Decreto 1499 de 2017, la resolución 1519 de 2020, los lineamientos de Gobierno Digital y el Acuerdo de Escazú) obliga a tener lineamientos (protocolo, guía, instructivo, procedimiento, etc) en el que se establezca los pasos y responsabilidades para la actualización de la información ambiental del menú \"Participa\". Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 3,
    module_id: 1,
    question_text:
      "3. Actualizamos la información correspondiente a planes y programas de proyectos ambientales de manera mensual",
    question_type: "statement" as const,
    order_index: 3,
    recommendations: {
      "Sí - Básico":
        "Actualicen de manera periódica la información relacionada con planes, programas y proyectos ambientales, asegurando el cumplimiento de los principios de transparencia y máxima publicidad establecidos en la Ley 1712 de 2014 y en el Acuerdo de Escazú, publicando información clara, comprensible y accesible, para facilitar su consulta y comprensión por parte de la persona que consulte.",
      "Sí - Intermedio":
        "Establezcan un protocolo o instructivo para la actualización de la información relacionada con planes, programas y proyectos ambientales, asegurando que se mantenga al día. Incluyan una rutina de revisión periódica de todos los planes y proyectos ambientales disponibles, completen la información que haga falta y aseguren su actualización en la página web institucional. Presenten estos contenidos de forma clara, comprensible y accesible, para facilitar su consulta y comprensión por parte de la ciudadanía.",
      "Sí - Avanzado":
        "Mantengan actualizada la información relacionada con planes, programas y proyectos ambientales disponibles. Asegúrense que la información se publique en formatos abiertos y en línea como lo establece la Ley 1712 de 2014, el CONPES 3920 y el Acuerdo de Escazú. Incorporen indicadores y avances de seguimiento de esos planes, programas y proyectos ambientales para facilitar su monitoreo ciudadano.",
      No: "¡ALERTA! El acceso a la información pública ambiental es un derecho de obligatorio cumplimiento. Identifiquen planes, programas y proyectos ambientales en su territorio, organicen la información de cada uno y establezcan un sistema claro y práctico para la publicación y actualización de la información de manera que se mantenga al día, asegurando el cumplimiento de los principios de transparencia y máxima publicidad establecidos en la Ley 1712 de 2014 y en el Acuerdo de Escazú.",
      "No aplica":
        "¡ALERTA! Tener lineamientos de actualización de la información correspondiente a planes y programas de proyectos ambientales es obligatorio en el marco del derecho de acceso a la información pública ambiental. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 4,
    module_id: 1,
    question_text: "4. Nuestra página es accesible para todas las poblaciones diferenciales de nuestro territorio",
    question_type: "statement" as const,
    order_index: 4,
    recommendations: {
      "Sí - Básico":
        "Identifiquen de manera precisa los grupos poblacionales presentes en su territorio y reconozcan sus necesidades específicas en materia de accesibilidad. A partir de este análisis, incorporen criterios de accesibilidad y enfoque diferencial en la gestión de la información ambiental, y elaboren una ruta o plan de trabajo que oriente su implementación progresiva.",
      "Sí - Intermedio":
        "Revisen los criterios de accesibilidad definidos en la Resolución 1519 de 2020 (Anexo Técnico 1 - Guía WCAG) y en el artículo 14 del Decreto 2106 de 2019. Identifiquen el nivel actual de cumplimiento, determinen los aspectos pendientes y valoren los recursos necesarios para su implementación. Con base en este diagnóstico, elaboren una ruta o plan de trabajo que permita avanzar de forma planificada y sostenible.",
      "Sí - Avanzado":
        "Complementen este cumplimiento con acciones innovadoras que mejoren la experiencia de acceso, e incluyan validaciones con los grupos poblacionales como parte del proceso de mejora continua. Aseguren que la página web institucional cumpla con los estándares de accesibilidad establecidos en la Resolución 1519 de 2020 y en el artículo 14 del Decreto 2106 de 2019, garantizando el acceso efectivo a la información ambiental para todas las poblaciones del territorio.",
      No: "¡ALERTA! Revisen los criterios de accesibilidad contenidos en la normativa vigente (Resolución 1519 de 2020 y en el artículo 14 del Decreto 2106 de 2019) y elaboren una ruta o plan de trabajo que les permita iniciar su implementación de forma ordenada, gradual y acorde con las capacidades de la entidad. Este proceso debe orientarse a garantizar el acceso equitativo a la información ambiental.",
      "No aplica":
        "¡ALERTA! Es un compromiso con el acceso a la información pública garantizar el acceso equitativo a la información ambiental a todas las poblaciones de su territorio. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 5,
    module_id: 1,
    question_text: "5. Hemos hecho pruebas de sistema de lenguaje claro en nuestra página",
    question_type: "statement" as const,
    order_index: 5,
    recommendations: {
      "Sí - Básico":
        "Realicen pruebas de comprensión dirigidas a la ciudadanía, enfocadas en contenidos clave como trámites, normativas o decisiones ambientales. Estas pruebas deben permitir identificar dificultades en el entendimiento de la información y orientar ajustes que fortalezcan la transparencia. Se recomienda basarse en las herramientas y guías de la Estrategia Nacional de Lenguaje Claro (DAFP), priorizando aquellos contenidos que inciden directamente en el ejercicio del derecho al acceso a la información ambiental, conforme a la Ley 1712 de 2014, el Acuerdo de Escazú y el Decreto 1499 de 2017.",
      "Sí - Intermedio":
        "Institucionalicen la implementación del lenguaje claro a través de protocolos que incluyan validaciones sistemáticas con diversos públicos, especialmente aquellos con mayores barreras de acceso, como comunidades rurales, grupos étnicos o personas con baja escolaridad. Este proceso debe estar alineado con los principios y herramientas de la Estrategia Nacional de Lenguaje Claro (DAFP), promoviendo una comunicación pública comprensible y garantizando el acceso efectivo y no discriminatorio a la información ambiental, en cumplimiento de la Ley 1712 de 2014, el Acuerdo de Escazú y el Decreto 1499 de 2017.",
      "Sí - Avanzado":
        "Establezcan procesos y procedimientos que permitan la cocreación de documentos, contenidos o textos junto con los grupos poblacionales presentes en el territorio. Esta colaboración debe garantizar la inclusión de sus voces, saberes y necesidades, fortaleciendo la legitimidad de la información ambiental y promoviendo el acceso equitativo al conocimiento público.",
      No: "¡ALERTA! Inicien un diagnóstico básico de los contenidos publicados en la página web institucional, con especial atención a aquellos relacionados con los derechos de acceso a la información ambiental. Como parte del compromiso con la transparencia, se sugiere aplicar los lineamientos de la Estrategia Nacional de Lenguaje Claro del Departamento Administrativo de la Función Pública (DAFP), para asegurar el uso de un lenguaje accesible, directo y comprensible para toda la ciudadanía, en concordancia con la Ley 1712 de 2014, el Acuerdo de Escazú y el Decreto 1499 de 2017.",
      "No aplica":
        "¡ALERTA! Es un compromiso con la transparencia y la lucha contra la corrupción el garantizar la comprensión de la información ambiental a todas las poblaciones de su territorio. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 6,
    module_id: 1,
    question_text:
      "6. Dentro de nuestra página web los canales de contacto son visibles y accesibles a todas las poblaciones diferenciales de nuestro territorio",
    question_type: "statement" as const,
    order_index: 6,
    recommendations: {
      "Sí - Básico":
        "Realicen los ajustes necesarios para asegurar que de manera continua los canales de contacto institucionales sean visibles, accesibles y estén adaptados a las características y necesidades de las poblaciones diferenciales del territorio. Revisen los criterios definidos en el Decreto 1499 de 2017 (relacionamiento Estado–Ciudadanía), la Ley 1712 de 2014, la Resolución 1519 de 2020 (anexo técnico 2) y el Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Incorporen criterios de enfoque diferencial en los canales de contacto institucionales, de modo que se garantice la inclusión efectiva y la participación activa de los distintos grupos poblacionales presentes en el territorio. Creen un protocolo de mantenimiento y mejoramiento del acceso.",
      "Sí - Avanzado":
        "Diseñen e implementen procesos que faciliten la evaluación continua de los canales de contacto web por parte de los grupos poblacionales del territorio. Esta evaluación debe permitir recoger sus percepciones y sugerencias, e identificar si existen otros medios de contacto más pertinentes o efectivos que requieran un diseño y planeación adaptada a sus contextos y necesidades específicas.",
      No: "¡ALERTA! Revisen los lineamientos sobre relacionamiento con la ciudadanía establecidos en el Decreto 1499 de 2017, la Ley 1712 de 2014, la Resolución 1519 de 2020 (anexo técnico 2) y el Acuerdo de Escazú, y elaboren una ruta o plan de trabajo que les permita avanzar de manera progresiva y racional en la adecuación de sus canales de contacto, priorizando la inclusión, accesibilidad y transparencia.",
      "No aplica":
        "¡ALERTA! Es un compromiso con el derecho de acceso a la información pública el garantizar acceso equitativo a la información ambiental por medio de la página web institucional a todas las poblaciones de su territorio. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 7,
    module_id: 1,
    question_text:
      "7. El tiempo de respuesta de nuestros PQRS ambientales siempre se entregan bajo los términos de ley",
    question_type: "statement" as const,
    order_index: 7,
    recommendations: {
      "Sí - Básico":
        "Inicien el proceso de actualización y mejoramiento de respuesta a solicitudes ciudadanas para ello revisen la Ley 1755 y su reglamentación interna.",
      "Sí - Intermedio":
        "Identifiquen las causas que han originado incumplimientos en los tiempos de respuesta a solicitudes ciudadanas y definan acciones de mejora que permitan prevenir su recurrencia, fortaleciendo así la confianza y la eficiencia institucional.",
      "Sí - Avanzado":
        "Fortalezcan de manera participativa el seguimiento constante a la gestión de PQRS ambientales para asegurar respuestas en lenguaje claro comprensibles para los ciudadanos. Midan el nivel de comprensión de sus respuestas. Complementen esta labor con la publicación periódica de informes que incluyan estadísticas, tiempos de respuesta y mejoras implementadas, como lo establece la Resolución 1519 de 2020.",
      No: "¡ALERTA! La normatividad vigente obliga la respuesta de PQRS, no responder en los tiempos estipulados por la ley es una falta disciplinaria que puede llevar al funcionario o funcionarios encargados de responder a ser sancionados. Inicien el proceso de actualización y mejoramiento de respuesta a solicitudes ciudadanas para ello revisen la Ley 1755 y su reglamentación interna.",
      "No aplica":
        "¡ALERTA! La normatividad vigente obliga la respuesta de PQRS, no responder en los tiempos estipulados por la ley es una falta disciplinaria que puede llevar al funcionario o funcionarios encargados de responder a ser sancionados. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 8,
    module_id: 1,
    question_text: "8. Tenemos establecidos claramente los criterios para denegar solicitudes de información ambiental",
    question_type: "statement" as const,
    order_index: 8,
    recommendations: {
      "Sí - Básico":
        "Elaboren o actualicen el índice de información clasificada y reservada, asegurando que se incluyan los actos, documentos y datos que, conforme a la Ley 1712 de 2014, se encuentran legalmente restringidos. Definan de forma clara y accesible los criterios aplicables para la denegación de solicitudes de información ambiental, conforme al artículo 18 de dicha ley.",
      "Sí - Intermedio":
        "Revisen el índice de información clasificada y reservada y asegúrense de que incluya de forma explícita y comprensible los criterios para la denegación de información ambiental, en concordancia con el artículo 18 de la Ley 1712 de 2014. Verifiquen que esté adoptado formalmente mediante acto administrativo vigente y actualícenlo si es necesario. Para fortalecer la cultura de transparencia, promuevan espacios de formación dirigidos tanto a servidores públicos como a la ciudadanía, en los que se expliquen de manera clara las causales legales de reserva y se fomenten prácticas de acceso abierto responsable.",
      "Sí - Avanzado":
        "Sigan actualizando el índice de información clasificada y reservada, incluyendo de manera ordenada y sistemática las denominaciones, motivaciones y actos administrativos que justifican la reserva o clasificación. Esto no solo contribuye al cumplimiento de la Ley 1712 de 2014 y del Acuerdo de Escazú, sino que fortalece la confianza ciudadana en la gestión pública. Como buena práctica, pueden implementar un calendario de revisión trimestral y designar responsables por área para asegurar su constante actualización.",
      No: "¡ALERTA! Revisen los criterios, procedimientos y definiciones establecidos en el artículo 18 de la Ley 1712 de 2014 y en el Acuerdo de Escazú relacionados con la denegación de información ambiental. A partir de esta revisión, elaboren una ruta o plan de trabajo que les permita avanzar gradualmente en la adopción e implementación de estos lineamientos. Pueden considerar acciones como: identificar vacíos normativos internos, fortalecer capacidades técnicas del equipo jurídico, y establecer mecanismos internos de revisión y validación antes de emitir una respuesta negativa a una solicitud de información.",
      "No aplica":
        "¡ALERTA! La normatividad vigente obliga la elaboración de índice de información clasificada y reservada o no hacerlos se configura como una falta disciplinaria que puede llevar al funcionario o funcionarios encargados de la información a ser sancionados. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 9,
    module_id: 1,
    question_text: "9. Conocemos la prueba de interés público para determinar la denegación de información",
    question_type: "statement" as const,
    order_index: 9,
    recommendations: {
      "Sí - Básico":
        "Definan claramente en qué situaciones aplica esta prueba y construyan un protocolo o instructivo que oriente su aplicación dentro de la entidad. Este instrumento puede incluir criterios técnicos y jurídicos, pasos de análisis, responsables por área, tiempos máximos de respuesta y ejemplos prácticos. Para garantizar su correcta implementación, promuevan procesos de formación interna, y sesiones de retroalimentación con los equipos encargados de gestionar solicitudes de información.",
      "Sí - Intermedio":
        "Implementen un sistema de seguimiento específico para los casos en los que se haya aplicado la prueba de interés público, documentando las justificaciones técnicas y jurídicas de manera clara y verificable. Para fortalecer la gestión institucional, desarrollen indicadores que permitan analizar la frecuencia de uso, los tipos de información involucrada y las decisiones tomadas.",
      "Sí - Avanzado":
        "Realicen seguimiento periódico a los casos en los que se haya aplicado la prueba de interés público, manteniendo cifras actualizadas y registros sistematizados. Para fortalecer la trazabilidad y gestión del conocimiento, creen una base de datos interna o tablero de control que sirva como insumo para procesos de mejora y rendición de cuentas.",
      No: "¡ALERTA! Revisen en el Acuerdo de Escazú y en la Ley 1712 de 2024 los criterios de denegación de información, entrega parcial de la información y la aplicación de la prueba de interés público. Determinen en qué casos y ocasiones procede la aplicación de la prueba de interés público y elaboren un protocolo (procedimiento, guía, instrumento) que determine los criterios, roles y responsabilidades para su aplicación. Socialicen y capaciten.",
      "No aplica":
        "¡ALERTA! Es importante conocer la prueba de interés público para determinar la denegación de información ambiental. Pidan un concepto al área jurídica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 10,
    module_id: 1,
    question_text:
      "10. Contamos con formatos alternativos, accesibles y comprensibles para que la ciudadanía pueda acceder a la información ambiental y servicios de manera efectiva, incluyendo a la población en situación de vulnerabilidad",
    question_type: "statement" as const,
    order_index: 10,
    recommendations: {
      "Sí - Básico":
        "Revisen de manera integral todos los formatos que ofrece la entidad, asegurándose de que sean comprensibles, inclusivos y accesibles, según lo establecido en la normativa vigente. Para ello, pueden aplicar listas de verificación basadas en los estándares internacionales WCAG 2.1. En función de los hallazgos, realicen los ajustes necesarios que permitan a cualquier persona, independientemente de sus condiciones, acceder efectivamente a los servicios institucionales y la información ambiental disponible.",
      "Sí - Intermedio":
        "Implementen un sistema de seguimiento al uso y efectividad de los formatos disponibles, evaluando su nivel de accesibilidad frente a las necesidades reales de los grupos poblacionales del territorio. Para ello, pueden aplicar encuestas de satisfacción, recoger retroalimentación directa o realizar ejercicios de observación con públicos diversos. Con base en estos insumos, propongan mejoras continuas y mantengan los formatos actualizados, asegurando que respondan tanto a los cambios normativos como a las transformaciones en el contexto institucional y social.",
      "Sí - Avanzado":
        "Realicen un diagnóstico comparativo frente a los formatos actualmente en uso. Lleve a cabo pruebas de usuario con distintos perfiles poblacionales o implemente procesos de validación participativa. A partir de esta revisión, construyan una ruta o plan de trabajo para su adecuación progresiva, priorizando aquellos de mayor uso o impacto en el acceso a información ambiental.",
      No: "¡ALERTA! Parte de su población no tiene acceso a información ambiental. Diseñe formatos alternativos, accesibles y comprensibles que faciliten el acceso a la información ambiental y a los servicios institucionales, en cumplimiento de la Ley 1712 de 2024, la Resolución 1519 de 2020 (anexo técnico 1), el Acuerdo de Escazú, la Ley 1346 de 2009 y los principios de accesibilidad universal.",
      "No aplica":
        "¡ALERTA! es un compromiso con el acceso a la información pública garantizar el acceso equitativo a la información ambiental a todas las poblaciones de su territorio. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 11,
    module_id: 1,
    question_text:
      "11. Hemos definido costos asociados con la entrega de información ambiental razonables y transparentes",
    question_type: "statement" as const,
    order_index: 11,
    recommendations: {
      "Sí - Básico":
        "Elaboren y adopten mediante acto administrativo una tabla de costos de reproducción de la información pública, en la que se detalle de forma clara y comprensible el valor unitario por tipo de formato (impreso, digital, audiovisual, entre otros). Asegúrense de que estos valores sean razonables, estén sustentados técnicamente y no generen barreras económicas al acceso a la información ambiental. Publiquen esta información en un lugar visible de la página web institucional y en los canales de atención a la ciudadanía, promoviendo la transparencia activa.",
      "Sí - Intermedio":
        "Realicen un análisis de costos realista que incluya factores como tipo de soporte, insumos y tiempos de procesamiento. Publique las actualizaciones en un lenguaje claro y en formatos accesibles, Revise y actualice periódicamente el acto administrativo que fija los costos de reproducción, asegurando que los valores estén alineados con la normatividad vigente (Ley 1712 de 2014, Resolución 1519 de 2020, Acuerdo de Escazú).",
      "Sí - Avanzado":
        "Realicen una revisión anual de estos costos en la que puedan participar actores clave del territorio, como organizaciones sociales, veedurías y ciudadanía interesada. Esta revisión participativa permite ajustar los valores a la realidad institucional y social. Mantengan disponibles y fácilmente consultables los costos de reproducción de la información pública, incluyendo la versión vigente del acto administrativo que los respalda.",
      No: "¡ALERTA! Revisen los lineamientos establecidos en el artículo 26 de la Ley 1712 de 2014, la Resolución 1519 de 2020 y el Acuerdo de Escazú, y establezca una política institucional de costos de reproducción que asegure su razonabilidad, transparencia y coherencia con el principio de no discriminación. Implementen criterios diferenciales para personas o grupos en condición de vulnerabilidad. Esta política puede quedar consolidada en un protocolo interno, acompañado de un instructivo claro para su aplicación.",
      "No aplica":
        "¡ALERTA! Para ejercer su derecho de acceso a la información pública, la ciudadanía debe conocer los costos asociados con la entrega de información ambiental. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  // Módulo 2 - Preguntas 12-19
  {
    id: 12,
    module_id: 2,
    question_text:
      "12. Informamos a mi ciudadanía de manera trimestral sobre su derecho al acceso de la información ambiental (por medios físicos, remotos y locales de comunicación)",
    question_type: "statement" as const,
    order_index: 12,
    recommendations: {
      "Sí - Básico":
        "Diseñen un plan de divulgación trimestral que establezca claramente los responsables de la comunicación, identifique los medios disponibles (como carteleras comunitarias, boletines informativos, redes sociales institucionales o emisoras locales) y propongan un cronograma mínimo para garantizar una difusión continua. Prioricen contenidos clave relacionados con el derecho al acceso a la información ambiental.",
      "Sí - Intermedio":
        "Fortlezcan la estrategia de comunicación mediante la estandarización de los mensajes institucionales y la calendarización de las acciones de divulgación, procurando que la información llegue de manera oportuna y comprensible a todos los grupos poblacionales del territorio. Para ello, podrían combinarse medios digitales (página web, redes sociales, correo electrónico) y físicos (boletines impresos, perifoneo, encuentros comunitarios), adaptando el lenguaje y los formatos según las características socioculturales de cada población.",
      "Sí - Avanzado":
        "Implementen mecanismos accesibles de retroalimentación ciudadana, como encuestas breves, buzones de opinión, grupos focales o consultas virtuales, que permitan evaluar si la información ambiental difundida está siendo comprendida y resulta útil para la ciudadanía. A partir de estos insumos, realicen ajustes periódicos a la estrategia de comunicación, mejorando el diseño de los contenidos y su pertinencia territorial.",
      No: "¡ALERTA! Diseñen un plan de divulgación que establezca claramente con qué periodicidad pueden realizar estas campañas, los responsables de la comunicación, identifiquen los medios disponibles (como carteleras comunitarias, boletines informativos, redes sociales institucionales o emisoras locales) y propongan un cronograma mínimo para garantizar una difusión continua. Prioricen contenidos clave relacionados con el derecho al acceso a la información ambiental.",
      "No aplica":
        "¡ALERTA! Es un derecho de la ciudadanía conocer sobre sus derechos al acceso de la información ambiental (por medios físicos, remotos y locales de comunicación). Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 13,
    module_id: 2,
    question_text:
      "13. Tenemos un registro de emisiones y transferencias de contaminantes al aire, agua, suelo y subsuelo bajo su jurisdicción conforme a la normatividad aplicable",
    question_type: "statement" as const,
    order_index: 13,
    recommendations: {
      "Sí - Básico":
        "Implementen un sistema básico de registro que les permita iniciar la recolección estructurada de datos sobre emisiones y transferencias de contaminantes. Establezcan un formato estándar para los reportes internos, de modo que comiencen a fortalecer sus procesos de documentación y seguimiento.",
      "Sí - Intermedio":
        "Desarrollen un mecanismo que les permita consolidar y sistematizar los datos que ya tengan disponibles, y que establezcan procedimientos periódicos de actualización y validación.",
      "Sí - Avanzado":
        "Amplíen la interoperabilidad de su sistema de registro con otras bases de datos ambientales, tanto internas como externas. Aseguren el cumplimiento de estándares de calidad de datos y fortalezcan las capacidades técnicas del personal mediante procesos formativos continuos.",
      No: "¡ALERTA! Implementen un sistema básico de registro actualizado de emisiones y transferencias de contaminantes al aire, agua, suelo y subsuelo, de acuerdo con los lineamientos del RUA, el PRTR Colombia y la normativa vigente. Esto contribuiría significativamente al cumplimiento del artículo 6 del Acuerdo de Escazú y al fortalecimiento del derecho al acceso a la información ambiental.",
      "No aplica":
        "¡ALERTA! Es un derecho de la ciudadanía conocer sobre emisiones y transferencias de contaminantes al aire, agua, suelo y subsuelo en su territorio. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 14,
    module_id: 2,
    question_text:
      "14. Garantizamos la divulgación inmediata de información en caso de una amenaza inminente a la salud pública o al medio ambiente",
    question_type: "statement" as const,
    order_index: 14,
    recommendations: {
      "Sí - Básico":
        "Diseñen o implementen un protocolo básico que les permita actuar con agilidad ante una emergencia ambiental. Este protocolo debería establecer quién comunica qué, por qué canal y en cuánto tiempo. Incluyan medios digitales, físicos y comunitarios, y realicen una versión de fácil consulta para la ciudadanía.",
      "Sí - Intermedio":
        "Conformen un comité interinstitucional de respuesta rápida para coordinar acciones de divulgación inmediata, reduciendo tiempos y evitando duplicidades de información.",
      "Sí - Avanzado":
        "Capaciten de forma periódica al personal encargado de la comunicación en contextos de emergencia, incluyendo simulacros y ejercicios prácticos. Asimismo, Implementen encuestas o espacios participativos para recoger percepciones ciudadanas y ajustar sus estrategias comunicativas de forma proactiva.",
      No: "¡ALERTA! En cumplimiento con el principio de precaución, el artículo 8 de la Ley 99 de 1993 y los compromisos del artículo 6 del Acuerdo de Escazú deben establecer un protocolo para la divulgación inmediata de información ante una amenaza inminente a la salud pública o al ambiente, . Este protocolo puede incluir la activación de alertas tempranas a través de medios comunitarios, redes sociales institucionales, mensajes de texto masivos, radios locales y carteleras físicas en zonas afectadas. También es clave capacitar al personal responsable y articularse con los comités de gestión del riesgo y autoridades ambientales para asegurar una respuesta rápida, coordinada y efectiva.",
      "No aplica":
        "¡ALERTA! En cumplimiento con el principio de precaución, el artículo 8 de la Ley 99 de 1993 y los compromisos del artículo 6 del Acuerdo de Escazú deben establecer un protocolo para la divulgación inmediata de información ante una amenaza inminente a la salud pública o al ambiente. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 15,
    module_id: 2,
    question_text: "15. Nuestra entidad usa y carga información de los sistemas de información ambiental (VITAL, SIAC, RUA)",
    question_type: "statement" as const,
    order_index: 15,
    recommendations: {
      "Sí - Básico":
        "Desarrollen espacios prácticos y pedagógicos que permitan a los equipos comprender no solo cómo funcionan VITAL, SIAC y RUA sino también su impacto en la toma de decisiones, la planificación y la rendición de cuentas. Incorporen ejercicios aplicados, estudios de caso y materiales gráficos sencillos que faciliten el aprendizaje.",
      "Sí - Intermedio":
        "Determinen un cronograma insitucional con responsables definidos para la carga periódica de información, que incluya un protocolo básico de validación de datos antes del envío y actualización oportuna de los sistemas de información ambiental VITAL, SIAC y RUA.",
      "Sí - Avanzado":
        "Revisen y actualicen los procedimientos internos asociados a la gestión de información para mejorar la calidad de los datos cargados, asegurando la retroalimentación con los equipos técnicos y fortaleciendo la rendición de cuentas sobre los reportes generados. Fortalezcan el uso y la actualización oportuna de los sistemas de información ambiental como VITAL, SIAC y RUA.",
      No: "¡ALERTA! Fortalezcan el uso y la actualización oportuna de los sistemas de información ambiental como VITAL, SIAC y RUA, asegurando la carga regular de datos conforme a la normativa vigente. Esto mejora la gestión ambiental, facilita la toma de decisiones basada en evidencia y contribuye al cumplimiento de los principios de transparencia y acceso a la información establecidos en el Acuerdo de Escazú. Capacite al personal técnico y designe responsables para garantizar el funcionamiento continuo de estos sistemas.",
      "No aplica":
        "¡ALERTA! Los sisitema de información ambiental mejoran la toma de decisiones y la transparencia. La falla de actualización obscurece la gestión y no permite comunicar la riqueza de los avances del sector a la ciudadanía. Pidan un concepto al área juridica para asegurar que su entidad no es responsable de la subida de información a VITAL, SIAC y RUA,.",
    },
  },
  {
    id: 16,
    module_id: 2,
    question_text: "16. Nuestros datos ambientales siempre están disponibles en formatos editable",
    question_type: "statement" as const,
    order_index: 16,
    recommendations: {
      "Sí - Básico":
        "Conviertan los documentos en formatos cerrados, como PDF, a formatos abiertos y editables, como WORD XLS o CSV, priorizando aquellos de mayor interés ciudadano; para ello, identifiquen los archivos más consultados en la web o solicitados por derecho de petición y utilicen herramientas básicas de conversión disponibles en programas de ofimática.",
      "Sí - Intermedio":
        "Realicen un inventario de los conjuntos de datos disponibles y definan un plan gradual de apertura, comenzando con los datos más relevantes para la gestión ambiental; organicen esta tarea en una hoja de cálculo simple, asignando responsables y fechas de actualización para cada conjunto.",
      "Sí - Avanzado":
        "Mejoren la documentación de los datos asegurando que cada conjunto incluya metadatos básicos como fecha de publicación, responsable, unidad de medida y fuente; para ello, creen una plantilla estándar que facilite la sistematización y revisión periódica por parte del equipo técnico.",
      No: "¡ALERTA! Adopten la práctica de publicar los datos ambientales en formatos abiertos directamente en su página web y plataformas públicas como datos.gov.co, asegurando que sean fáciles de descargar y entender; incluyan una sección específica en el sitio institucional, habiliten alertas de actualización y elaboren guías breves o infografías que expliquen el uso de los datos para facilitar su comprensión por parte de la ciudadanía.",
      "No aplica":
        "¡ALERTA! Es un compromiso del país con la Alianza para el Gobierno Abierto tener datos ambientales disponibles en formatos editables para su uso en el control social, la investigación académica y la veeduría. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 17,
    module_id: 2,
    question_text:
      "17. Medimos nuestro desempeño ambiental, implemento un plan estructurado, documentado para mitigar impactos y mejorar, así como divulgo los resultados a la ciudadanía",
    question_type: "statement" as const,
    order_index: 17,
    recommendations: {
      "Sí - Básico":
        "Inicien con un diagnóstico ambiental básico que identifique los principales impactos y les permita formular un plan estructurado con metas y acciones prioritarias. Establezcan un cronograma con responsables, plazos e indicadores, apoyado en una matriz de actividades y una hoja de control que facilite el seguimiento, los ajustes y la divulgación progresiva de los resultados a la ciudadanía.",
      "Sí - Intermedio":
        "Fortalezcan el seguimiento del plan de desempeño ambiental, asignen responsabilidades específicas por área, definan los indicadores de medición y programen rutinas periódicas de evaluación; para ello, pueden apoyarse en una plantilla simple que consolide las acciones, responsables y tiempos, y utilizar herramientas digitales como calendarios compartidos o tableros de seguimiento que faciliten el control y la mejora continua.",
      "Sí - Avanzado":
        "Fortalezcan los canales de comunicación con la ciudadanía para divulgar los resultados ambientales de manera accesible y comprensible; para ello, pueden utilizar boletines digitales, resúmenes visuales en lenguaje claro, sesiones informativas y mecanismos de retroalimentación que permitan adaptar los mensajes según las necesidades del público.",
      No: "¡ALERTA! Elaboren un diagnóstico ambiental básico que identifique los principales impactos de su gestión y formulen un plan estructurado y documentado con metas, indicadores y acciones prioritarias para mitigar impactos y mejorar su desempeño ambiental. Aseguren el seguimiento mediante herramientas de control, y divulguen los resultados de forma accesible a la ciudadanía, en coherencia con la normativa vigente y promoviendo la transparencia y la participación.",
      "No aplica":
        "¡ALERTA! Es muy dificil mejorar o mitigar riesgos si no mido mi desempeño ambiental. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 18,
    module_id: 2,
    question_text:
      "18. Publicamos información completa sobre los procesos de toma de decisiones ambientales ( concesiones, licencias, permisos, contratos, convenios o autorizaciones , entre otros)",
    question_type: "statement" as const,
    order_index: 18,
    recommendations: {
      "Sí - Básico":
        "Diseñen un plan básico de publicación periódica, preferiblemente mensual, que incluya un formato estándar por tipo de documento (concesiones, licencias, permisos, contratos, convenios o autorizaciones , entre otros), de modo que exista un punto de partida claro, accesible y replicable; para ello, pueden estructurar una matriz sencilla que defina el tipo de información, responsable de carga y fecha de publicación.",
      "Sí - Intermedio":
        "Implementen mecanismos de trazabilidad que permitan hacer seguimiento a cada documento publicado (concesiones, licencias, permisos, contratos, convenios o autorizaciones , entre otros), mediante la creación de fichas técnicas con metadatos básicos (fecha, fuente, tipo de decisión, responsable) y cronogramas visibles de publicación; además, completen los registros faltantes para brindar un panorama coherente, verificable y útil para la ciudadanía.",
      "Sí - Avanzado":
        "Incorporen auditorías internas periódicas, al menos una vez por semestre, donde se revise la vigencia e integridad de la información publicada, identifiquen oportunidades de mejora y verifiquen su interoperabilidad con otras plataformas públicas o territoriales; pueden crear un equipo o designar un responsable para liderar esta tarea y generar un informe breve de hallazgos y recomendaciones.",
      No: "¡ALERTA! Aseguren que la información relacionada con los procesos de toma de decisiones ambientales, como concesiones, licencias, permisos, contratos, convenios y autorizaciones, sea publicada de forma accesible, completa y en formatos abiertos, incluyendo criterios de evaluación, responsables, decisiones tomadas e impactos ambientales considerados. Esta acción contribuye a garantizar la transparencia, el acceso a la información y la participación ciudadana, en cumplimiento con los principios del artículo 6 del Acuerdo de Escazú y la Ley 1712 de 2014.",
      "No aplica":
        "¡ALERTA! El acceso a la información ambiental incluyendo información completa sobre los procesos de toma de decisiones ambientales (concesiones, licencias, permisos, contratos, convenios o autorizaciones , entre otros) es un derecho de los ciudadanos . Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 19,
    module_id: 2,
    question_text:
      "19. Tenemos una estrategia dirigida a privados, presentes en nuestro territorio, para que publiquen información ambiental",
    question_type: "statement" as const,
    order_index: 19,
    recommendations: {
      "Sí - Básico":
        "Realicen un diagnóstico rápido que les permita identificar actores privados relevantes en el territorio y definir temas ambientales prioritarios sobre los cuales podrían compartir información; para ello, pueden apoyarse en directorios empresariales, registros de licencias o permisos ambientales existentes, y crear una matriz básica que consolide la información de contacto, actividad económica y posibles aportes informativos de cada actor.",
      "Sí - Intermedio":
        "Formalicen los lineamientos actuales en un documento guía o protocolo que oriente cómo involucrar a privados en la publicación de información ambiental, incluyan incentivos, compromisos voluntarios o convenios de colaboración, y ejecuten al menos una acción piloto con un actor privado dispuesto; esto puede incluir talleres, mesas de trabajo o acuerdos específicos que promuevan la transparencia.",
      "Sí - Avanzado":
        "Revisen y actualicen la estrategia institucional incorporando mecanismos de seguimiento y evaluación del impacto de la publicación de información ambiental por parte de privados; fortalezcan la capacidad técnica del equipo mediante capacitaciones específicas y desarrollen herramientas de monitoreo que permitan medir el cumplimiento de los compromisos adquiridos por los actores privados.",
      No: "¡ALERTA! Desarrollen una estrategia dirigida a los actores privados presentes en el territorio para promover la publicación de información ambiental relevante, mediante la creación de alianzas con empresas, asociaciones y organizaciones locales, brindando orientación sobre la importancia de la transparencia ambiental y el cumplimiento de las normativas vigentes; establezcan incentivos o compromisos voluntarios para la divulgación de datos sobre impactos y medidas de mitigación, contribuyendo así al cumplimiento del artículo 6 del Acuerdo de Escazú y la Ley 1712 de 2014.",
      "No aplica":
        "¡ALERTA! Los privados manejan información ambiental muy valiosa que complementa la información pública y permite tener una visión integral del estado del ambiente en el territorio. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  // Módulo 3 - Preguntas 20-35
  {
    id: 20,
    module_id: 3,
    question_text:
      "20. Tenemos un plan ajustado a los marcos normativos nacionales e internacionales para asegurar la participación ciudadana en la toma de decisiones ambientales que incluye las obligaciones internacionales respecto a los derechos de los pueblos indígenas y las comunidades locales",
    question_type: "statement" as const,
    order_index: 20,
    recommendations: {
      "Sí - Básico":
        "Definan un plan completo que incorpore el enfoque étnico-territorial y el cumplimiento de los marcos normativos nacionales e internacionales en participación ambiental; para ello, pueden estructurar un documento guía que contenga principios, procedimientos y herramientas específicas que garanticen procesos inclusivos, culturalmente adecuados y con reconocimiento de los derechos colectivos, utilizando plantillas y metodologías adaptadas a las características de cada grupo poblacional.",
      "Sí - Intermedio":
        "Mejoren la implementación del plan mediante la ejecución de acciones articuladas de consulta, seguimiento y formación, en concordancia con la normativa nacional e instrumentos internacionales de derechos humanos y ambientales; aseguren que las medidas adoptadas reflejen los principios del Acuerdo de Escazú y la Ley 1757 de 2015, especialmente en relación con la participación efectiva y la justicia ambiental para comunidades étnicas, y establezcan mecanismos de retroalimentación y ajuste continuo.",
      "Sí - Avanzado":
        "Sistematicen y compartan el plan como una buena práctica institucional que demuestre el cumplimiento efectivo de la Ley 1757 de 2015 y el Acuerdo de Escazú conforme a los estándares de participación, transparencia y enfoque diferencial; para ello, pueden elaborar documentos de lecciones aprendidas, realizar presentaciones en espacios interinstitucionales y desarrollar herramientas replicables que faciliten la implementación en otras entidades.",
      No: "¡ALERTA! Formulen un plan de participación ciudadana que se ajuste a los marcos normativos nacionales e internacionales, incluyendo las obligaciones específicas sobre los derechos de los pueblos indígenas y comunidades locales, conforme al Acuerdo de Escazú y la Ley 1757 de 2015; este plan debe incorporar metodologías participativas, protocolos de consulta previa cuando corresponda, y mecanismos de seguimiento que aseguren el respeto de los derechos colectivos y territoriales.",
      "No aplica":
        "¡ALERTA! La participación ciudadana en la toma de decisiones ambientales es un derecho y una obligación estatal. El enfoque diferencial con pueblos indígenas y comunidades locales es mandatorio. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 21,
    module_id: 3,
    question_text:
      "21. Promovemos participación ciudadana abierta e inclusiva en las decisiones ambientales de manera transparente y teniendo en cuenta sus necesidades",
    question_type: "statement" as const,
    order_index: 21,
    recommendations: {
      "Sí - Básico":
        "Definan y fortalezcan los espacios existentes de participación para garantizar mayor inclusión, representatividad y acceso equitativo a la información; para ello, pueden crear un inventario de los espacios actuales, identificar gaps de participación, diseñar estrategias de convocatoria diversa y establecer protocolos básicos que aseguren que la participación sea promovida activamente entre diferentes actores del territorio, en cumplimiento de los principios de transparencia y no discriminación del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Implementen mecanismos estructurados de retroalimentación y trazabilidad que permitan hacer seguimiento a los aportes ciudadanos y desarrollen estrategias de comunicación clara y accesible; esto incluye crear formatos de reporte de participación, establecer canales bidireccionales de comunicación, y diseñar herramientas que faciliten a la ciudadanía conocer cómo sus aportes son considerados en la toma de decisiones ambientales, contribuyendo a procesos más legítimos y alineados con el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Incorporen nuevas estrategias de participación que aseguren incidencia real en las decisiones ambientales y cuenten con enfoques diferenciales adecuados; para ello, pueden implementar metodologías participativas innovadoras, desarrollar herramientas digitales y presenciales adaptadas a diferentes grupos poblacionales, y crear sistemas de evaluación que midan la efectividad de la participación, todo alineado con el Acuerdo de Escazú y la Ley 1757 de 2015.",
      No: "¡ALERTA! Inicien la implementación de espacios básicos de participación ciudadana que permitan a las personas expresar sus necesidades y acceder de manera transparente a la toma de decisiones ambientales, estableciendo procedimientos claros, cronogramas de participación y mecanismos de retroalimentación, en coherencia con lo establecido por el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! La participación ciudadana abierta e inclusiva en las decisiones ambientales es un derecho de la ciudadanía y una obligación del Estado. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 22,
    module_id: 3,
    question_text:
      "22. Promovemos activamente que la ciudadanía participe en cualquier momento del proceso de toma de decisiones",
    question_type: "statement" as const,
    order_index: 22,
    recommendations: {
      "Sí - Básico":
        "Mejoren la difusión y accesibilidad de los canales existentes, promoviendo activamente su uso en diversas etapas del proceso de decisión; para ello, pueden crear un plan de comunicación que incluya diferentes medios (redes sociales, radio, carteleras, reuniones comunitarias), establecer horarios flexibles de atención y desarrollar materiales informativos claros y accesibles que expliquen cómo y cuándo participar, avanzando hacia una participación más informada y continua, en línea con los estándares del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Fortalezcan la estrategia de participación mediante la creación de contenidos pedagógicos, convocatorias permanentes y mecanismos estructurados de retroalimentación; esto incluye desarrollar talleres formativos, establecer cronogramas de participación abiertos y crear sistemas que permitan a la ciudadanía conocer el impacto de sus aportes, asegurando mayor alcance y equidad en la participación, conforme a la Ley 1757 de 2015 y a los principios de transparencia y justicia ambiental del Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Institucionalicen la participación ciudadana como un componente transversal en todas las fases de decisión ambiental de su entidad, con enfoque de derechos, trazabilidad y evaluación participativa; para ello, pueden integrar la participación en los procedimientos internos, crear indicadores de medición, establecer protocolos de seguimiento y desarrollar herramientas de evaluación que permitan mejorar continuamente los procesos, conforme a la Ley 1757 de 2015 y a los principios de transparencia y justicia ambiental del Acuerdo de Escazú.",
      No: "¡ALERTA! Inicien acciones que permitan a la ciudadanía participar más allá de las etapas formales de consulta, estableciendo espacios abiertos y accesibles en todo el proceso de toma de decisiones ambientales, mediante la creación de mecanismos de participación continua, canales de comunicación permanentes y procedimientos claros que faciliten el involucramiento ciudadano, en línea con el Acuerdo de Escazú y conforme a la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! La promoción activa de la participación ciudadana en cualquier momento del proceso es una obligación estatal y un derecho ciudadano. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 23,
    module_id: 3,
    question_text:
      "23. Informamos oportunamente a la ciudadanía sobre los detalles de la participación en los procesos de toma de decisiones ambientales (por medios físicos, remotos y locales de comunicación)",
    question_type: "statement" as const,
    order_index: 23,
    recommendations: {
      "Sí - Básico":
        "Diversifiquen los medios de información utilizados, incluyendo formatos físicos (carteleras, volantes, periódicos locales), digitales (página web, redes sociales, correos electrónicos) y comunitarios (emisoras locales, líderes comunitarios, reuniones barriales), para establecer una estrategia de difusión oportuna, clara y accesible que permita a diferentes públicos conocer y acceder a los espacios de participación, conforme al principio de acceso a la información del Acuerdo de Escazú y las disposiciones de la Ley 1712 de 2014.",
      "Sí - Intermedio":
        "Fortalezcan la estrategia de comunicación desarrollando materiales informativos en lenguaje claro y accesible, con enfoque territorial y tiempos adecuados de anticipación; para ello, pueden crear formatos diferenciados según el público objetivo, establecer cronogramas de publicación, y utilizar canales específicos para llegar a poblaciones diversas, contribuyendo al ejercicio efectivo del derecho a participar y al cumplimiento del Acuerdo de Escazú y la Ley 1712 de 2014.",
      "Sí - Avanzado":
        "Continúen con la evaluación periódica y la mejora continua del sistema de información, implementando encuestas de satisfacción, análisis de alcance y mecanismos de retroalimentación que permitan garantizar su accesibilidad, pertinencia y adaptación a las necesidades de la ciudadanía; pueden crear indicadores específicos de efectividad comunicativa y desarrollar planes de mejora basados en los resultados, cumpliendo plenamente con los principios del Acuerdo de Escazú y la Ley 1712 de 2014.",
      No: "¡ALERTA! Establezcan canales básicos de comunicación que aseguren el acceso oportuno y claro a la información sobre procesos de participación, utilizando diversos medios (físicos, digitales y comunitarios) y desarrollando mensajes comprensibles que faciliten la participación ciudadana, conforme al principio de acceso a la información del Acuerdo de Escazú y las disposiciones de la Ley 1712 de 2014.",
      "No aplica":
        "¡ALERTA! Es un derecho de la ciudadanía estar informada oportunamente sobre los procesos de participación en toma de decisiones ambientales por diversos medios de comunicación. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 24,
    module_id: 3,
    question_text:
      "24. Tenemos planes específicos para facilitar la participación de las comunidades impactadas directamente en los procesos de toma de decisiones ambientales",
    question_type: "statement" as const,
    order_index: 24,
    recommendations: {
      "Sí - Básico":
        "Ajusten los planes existentes para incluir acciones específicas dirigidas a las comunidades más afectadas, garantizando canales de comunicación accesibles (reuniones presenciales, radio local, redes sociales), tiempos adecuados de anticipación y metodologías que faciliten la comprensión de los procesos técnicos; para ello, pueden crear guías participativas, utilizar lenguaje claro y desarrollar herramientas visuales que promuevan el diálogo efectivo, cumpliendo con el enfoque diferencial del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Mejoren la implementación de los planes asegurando que los mecanismos de participación sean efectivos, accesibles y culturalmente apropiados para las comunidades impactadas; esto incluye realizar diagnósticos participativos, establecer cronogramas de seguimiento, crear sistemas de retroalimentación y documentar compromisos adquiridos, garantizando que los aportes de las comunidades sean considerados de manera efectiva en las decisiones, en base al Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Consoliden y documenten estas prácticas como un referente institucional que promueva su sostenibilidad y replicabilidad; para ello, pueden sistematizar lecciones aprendidas, crear protocolos transferibles, establecer indicadores de impacto y desarrollar procesos de mejora continua que aseguren la alineación constante con las normativas internacionales y los compromisos del Acuerdo de Escazú y la Ley 1757 de 2015.",
      No: "¡ALERTA! Desarrollen planes específicos para facilitar la participación activa de las comunidades directamente impactadas por los procesos de toma de decisiones ambientales, incluyendo metodologías participativas, cronogramas de consulta, mecanismos de retroalimentación y protocolos de seguimiento que cumplan con los principios de acceso a la información y participación efectiva establecidos en el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! La participación de comunidades impactadas directamente por decisiones ambientales es un derecho fundamental y una obligación estatal. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 25,
    module_id: 3,
    question_text:
      "25. Informamos oportunamente a los grupos directamente afectados sobre su derecho a participar en los proyectos de impacto ambiental",
    question_type: "statement" as const,
    order_index: 25,
    recommendations: {
      "Sí - Básico":
        "Mejoren la difusión de la información asegurando que todos los grupos directamente afectados conozcan de manera oportuna sus derechos de participación; para ello, pueden utilizar múltiples canales (reuniones comunitarias, medios locales, carteleras, redes sociales), crear materiales informativos en lenguaje claro y establecer cronogramas de comunicación que garanticen el acceso equitativo y transparente a la información, cumpliendo con los principios establecidos en el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Fortalezcan los canales de comunicación desarrollando estrategias diferenciadas que aseguren que todos los grupos afectados reciban la información de manera clara, comprensible y culturalmente apropiada; esto incluye crear formatos accesibles, establecer tiempos adecuados de antelación, implementar mecanismos de confirmación de recepción y facilitar espacios de aclaración de dudas, permitiendo la participación informada en todas las etapas, como establece el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Continúen consolidando estos procesos mediante la evaluación periódica de la efectividad de los canales utilizados, implementando sistemas de retroalimentación con las comunidades afectadas y desarrollando indicadores de alcance e impacto; para ello, pueden realizar encuestas de satisfacción, crear mecanismos de mejora continua y establecer protocolos de actualización que garanticen una participación inclusiva y alineada con los principios del Acuerdo de Escazú y la Ley 1757 de 2015.",
      No: "¡ALERTA! Establezcan mecanismos básicos para informar a los grupos directamente afectados sobre su derecho a participar en los proyectos de impacto ambiental, mediante la creación de canales de comunicación efectivos, cronogramas de información oportuna y materiales accesibles que faciliten el ejercicio del derecho a la participación, conforme al principio de acceso a la información del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! Informar oportunamente a los grupos directamente afectados sobre su derecho a participar en proyectos de impacto ambiental es una obligación legal y un derecho ciudadano. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 26,
    module_id: 3,
    question_text:
      "26. Tenemos una estrategia para asegurar que las observaciones de la ciudadanía sean consideradas y contribuyan en los procesos de toma de decisiones",
    question_type: "statement" as const,
    order_index: 26,
    recommendations: {
      "Sí - Básico":
        "Fortalezcan el proceso de recepción de observaciones incorporando mecanismos de trazabilidad interna que permitan dar seguimiento sistemático a los aportes recibidos; para ello, pueden crear formatos de registro, asignar responsables del seguimiento, establecer plazos de respuesta y desarrollar sistemas de clasificación que faciliten el análisis y consideración de cada observación, avanzando hacia una participación más transparente e incidente, dando cumplimiento a los principios del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Consoliden la estrategia institucional implementando procesos sistemáticos para que las observaciones sean documentadas, analizadas, respondidas y consideradas en las decisiones; esto incluye crear protocolos de análisis, establecer comités de evaluación, desarrollar matrices de valoración y implementar sistemas de retroalimentación que refuercen la rendición de cuentas y den cumplimiento a los principios del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Implementen nuevas prácticas innovadoras que aseguren que todas las observaciones sean claramente reflejadas en las decisiones finales y que el sistema se mantenga accesible, transparente y evaluado de forma continua; para ello, pueden desarrollar plataformas digitales participativas, crear reportes públicos de consideración de observaciones, establecer indicadores de efectividad y promover la retroalimentación ciudadana para garantizar la máxima transparencia y efectividad en la participación.",
      No: "¡ALERTA! Establezcan una estrategia básica que permita recopilar, organizar, analizar y considerar de manera efectiva las observaciones ciudadanas dentro del proceso decisorio, mediante la creación de mecanismos de recepción, sistemas de seguimiento y protocolos de respuesta que representen un paso concreto hacia el cumplimiento de los estándares de participación efectiva del Acuerdo de Escazú y la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! Asegurar que las observaciones de la ciudadanía sean consideradas y contribuyan en los procesos de toma de decisiones es un principio fundamental de la participación democrática. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 27,
    module_id: 3,
    question_text:
      "27. Informamos oportunamente a la ciudadanía sobre la decisión ambiental final y los motivos que la sustentan",
    question_type: "statement" as const,
    order_index: 27,
    recommendations: {
      "Sí - Básico":
        "Mejoren la forma en que informan a la ciudadanía sobre las decisiones ambientales, desarrollando comunicaciones más claras, accesibles y detalladas que expliquen no solo la decisión, sino también sus fundamentos técnicos y jurídicos; para ello, pueden crear resúmenes ejecutivos en lenguaje claro, utilizar infografías explicativas, establecer canales efectivos y comprensibles para todos los públicos, y programar sesiones informativas que fortalezcan la transparencia y la participación ciudadana, cumpliendo con la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Avancen hacia un nivel más sólido de divulgación de las decisiones ambientales, complementando la información básica con explicaciones claras y detalladas sobre los fundamentos técnicos, jurídicos y ambientales que las sustentan; esto incluye emplear formatos accesibles (documentos, videos, presentaciones), utilizar canales efectivos para llegar a diversos públicos y crear espacios de diálogo que permitan aclarar dudas, fortaleciendo la transparencia institucional en cumplimiento de la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Elaboren una estrategia de comunicación integral y multiformato que facilite la comprensión de las decisiones ambientales y sus fundamentos, incluyendo mecanismos de retroalimentación ciudadana y evaluación del impacto informativo; para ello, pueden desarrollar plataformas digitales interactivas, crear sistemas de seguimiento de la efectividad comunicativa, implementar encuestas de comprensión y establecer indicadores de transparencia que posicionen a la entidad como referente en participación ambiental efectiva.",
      No: "¡ALERTA! Establezcan mecanismos básicos para informar oportunamente a la ciudadanía sobre las decisiones ambientales finales y sus motivos, mediante la creación de canales de comunicación efectivos, formatos accesibles y cronogramas de divulgación que cumplan con los principios de transparencia establecidos en la Ley 1712 de 2014 y el Acuerdo de Escazú, garantizando el derecho ciudadano al acceso a la información pública ambiental.",
      "No aplica":
        "¡ALERTA! Informar oportunamente sobre las decisiones ambientales finales y sus motivos es una obligación legal y un derecho ciudadano fundamental. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 28,
    module_id: 3,
    question_text: "28. Facilitamos la participación de comunidades que hablen idiomas distintos al idioma oficial",
    question_type: "statement" as const,
    order_index: 28,
    recommendations: {
      "Sí - Básico":
        "Fortalezcan la accesibilidad de la información pública mediante la implementación de formatos alternativos, comprensibles y multilingües que faciliten el acceso a grupos étnicos, culturales y personas con discapacidad; para ello, pueden identificar las lenguas predominantes en su territorio, crear materiales básicos en estos idiomas, utilizar intérpretes en reuniones comunitarias y desarrollar herramientas visuales que complementen la información escrita, cumpliendo con los artículos 8 y 17 de la Ley 1712 de 2014 y el artículo 6.6 del Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Mejoren la accesibilidad de la información pública desarrollando estrategias integrales que garanticen su divulgación en diversos idiomas y formatos accesibles; esto incluye crear alianzas con organizaciones de comunidades étnicas, capacitar al personal en sensibilidad intercultural, establecer protocolos de traducción y adaptar los sistemas de información para diferentes grupos poblacionales, cumpliendo con la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Consoliden la estrategia de accesibilidad mediante la divulgación proactiva de información en idiomas y formatos alternativos, integrando mecanismos de evaluación del impacto y retroalimentación comunitaria; para ello, pueden desarrollar plataformas digitales multilingües, crear redes de comunicadores comunitarios, establecer indicadores de inclusión y implementar sistemas de mejora continua que aseguren una participación ciudadana efectiva y culturalmente apropiada, conforme a la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      No: "¡ALERTA! Adopten medidas para garantizar el acceso a la información en idiomas, formatos y canales accesibles, adecuando los sistemas de información y medios de comunicación para llegar efectivamente a grupos étnicos, culturales y personas con discapacidad, mediante la implementación de servicios de traducción, materiales multilingües y metodologías participativas culturalmente apropiadas, cumpliendo con la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      "No aplica":
        "¡ALERTA! Facilitar la participación de comunidades que hablen idiomas distintos al oficial es una obligación del Estado colombiano como país pluriétnico y multicultural. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 29,
    module_id: 3,
    question_text:
      "29. Tenemos criterios claros para determinar qué personas o comunidades están directamente afectados por un proyecto o decisión ambiental",
    question_type: "statement" as const,
    order_index: 29,
    recommendations: {
      "Sí - Básico":
        "Definan criterios objetivos y públicos para identificar a las personas o comunidades directamente afectadas por decisiones ambientales, incluyendo aspectos geográficos, socioeconómicos, culturales y ambientales; para ello, pueden crear matrices de evaluación, desarrollar metodologías participativas de mapeo comunitario y establecer protocolos de consulta que garanticen la participación desde etapas tempranas, conforme a los artículos 5 y 6 del Acuerdo de Escazú, la Ley 1712 de 2014 y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Fortalezcan y sistematicen los criterios existentes asegurando que sean aplicados de forma coherente, inclusiva y con enfoque territorial y diferencial; esto incluye crear protocolos estandarizados, capacitar al personal técnico, establecer mecanismos de validación comunitaria y garantizar que los grupos identificados tengan acceso oportuno a información pública y espacios de participación efectiva, en cumplimiento de los artículos 5 y 6 del Acuerdo de Escazú, la Ley 1712 de 2014 y la Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Profundicen en la transparencia y trazabilidad de los procesos de identificación de comunidades afectadas, haciendo públicos los criterios y resultados con validación social y técnica; para ello, pueden desarrollar plataformas digitales de consulta, crear sistemas de retroalimentación comunitaria, establecer indicadores de efectividad y promover auditorías participativas que fortalezcan la confianza en la gestión ambiental, conforme al artículo 7 del Acuerdo de Escazú y garantizando derechos diferenciales.",
      No: "¡ALERTA! Definan criterios claros, públicos y participativos para identificar a las personas o comunidades directamente afectadas, mediante la creación de metodologías objetivas, procesos de consulta temprana y mecanismos de acceso a información relevante que garanticen la participación desde las primeras etapas del proceso, conforme a los artículos 5, 6 y 7 del Acuerdo de Escazú, la Ley 1757 de 2015 y la Ley 1712 de 2014.",
      "No aplica":
        "¡ALERTA! Determinar qué personas o comunidades están directamente afectadas por decisiones ambientales es fundamental para garantizar sus derechos de participación. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 30,
    module_id: 3,
    question_text:
      "30. Proporcionamos y promovemos procedimientos administrativos y judiciales para que la ciudadanía pueda impugnar o recurrir en decisiones ambientales",
    question_type: "statement" as const,
    order_index: 30,
    recommendations: {
      "Sí - Básico":
        "Adopten mecanismos institucionales que garanticen el acceso a procedimientos administrativos y judiciales efectivos para impugnar decisiones ambientales; para ello, pueden crear guías ciudadanas sobre recursos disponibles, establecer ventanillas de orientación jurídica, desarrollar formatos simplificados de peticiones y implementar canales accesibles de información, asegurando que la ciudadanía conozca y acceda fácilmente a estos recursos, en cumplimiento del artículo 5 del Acuerdo de Escazú, la Ley 1757 de 2015 y la Ley 1712 de 2014.",
      "Sí - Intermedio":
        "Fortalezcan y visibilicen los procedimientos existentes garantizando que la ciudadanía conozca sus derechos y cómo ejercerlos frente a decisiones ambientales; esto incluye eliminar barreras de acceso (territoriales, digitales o jurídicas), crear programas de capacitación comunitaria, establecer alianzas con organizaciones sociales y desarrollar herramientas digitales que faciliten el acceso a la justicia, cumpliendo con el artículo 8 del Acuerdo de Escazú, la Ley 1757 de 2015 y la Ley 1712 de 2014.",
      "Sí - Avanzado":
        "Consoliden las buenas prácticas institucionales promoviendo activamente el acceso a la justicia ambiental mediante estrategias integrales de divulgación, programas de acompañamiento jurídico y sistemas de evaluación del impacto de los recursos ejercidos; para ello, pueden crear observatorios de justicia ambiental, desarrollar indicadores de efectividad, establecer redes de apoyo ciudadano y promover la formación de líderes comunitarios en derechos ambientales, articulado con el artículo 8 del Acuerdo de Escazú y las leyes 1712 y 1757.",
      No: "¡ALERTA! Establezcan rutas claras de acción jurídica y administrativa que permitan a la ciudadanía ejercer su derecho a impugnar decisiones ambientales, mediante la creación de procedimientos accesibles, orientación jurídica básica y mecanismos de información oportuna que respondan al artículo 5 del Acuerdo de Escazú, la Ley 1757 de 2015 sobre mecanismos de participación y la Ley 1712 de 2014 sobre acceso a la información.",
      "No aplica":
        "¡ALERTA! Proporcionar procedimientos para que la ciudadanía pueda impugnar decisiones ambientales es parte del derecho fundamental al acceso a la justicia ambiental. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 31,
    module_id: 3,
    question_text: "31. Promovemos activamente el ejercicio del derecho al control social sobre la gestión ambiental",
    question_type: "statement" as const,
    order_index: 31,
    recommendations: {
      "Sí - Básico":
        "Implementen mecanismos claros para promover el ejercicio del control social en la gestión ambiental, desarrollando estrategias de comunicación ciudadana, espacios de diálogo y herramientas de acceso a la información que faciliten la supervisión comunitaria; para ello, pueden crear calendarios de rendición de cuentas, establecer canales de comunicación directa con la ciudadanía y desarrollar materiales informativos accesibles, en línea con los principios de transparencia y participación establecidos en la Ley 1712 de 2014, la Ley 1757 de 2015 y el artículo 8 del Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Fortalezcan los mecanismos de participación ciudadana para el ejercicio del control social sobre la gestión ambiental, promoviendo un acceso amplio y transparente a la información mediante la creación de sistemas de monitoreo participativo, capacitación comunitaria en derechos ambientales y establecimiento de protocolos de seguimiento ciudadano que garanticen que las decisiones y acciones ambientales sean sujetas a supervisión y rendición de cuentas, alineándose con la Ley 1757 de 2015 y el artículo 7 del Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Amplíen las estrategias de control social promoviendo la participación activa y continua de la ciudadanía en la gestión ambiental, más allá de los procesos de rendición de cuentas tradicionales; atrévanse a implementar modalidades innovadoras de control social como veedurías ciudadanas especializadas, juntas de vigilancia ambiental, comités de desarrollo y control social, auditorías ciudadanas participativas e instancias permanentes de participación ciudadana, conforme a los artículos 63 y 65 de la Ley 1757 de 2015.",
      No: "¡ALERTA! Elaboren e implementen un plan específico para fomentar el control social activo en la gestión ambiental, creando espacios formales de participación donde la ciudadanía pueda monitorear y evaluar las decisiones ambientales, garantizando que la información relevante sea proporcionada de manera accesible y en formatos comprensibles para facilitar la participación ciudadana efectiva, según el Título V, capítulo 1 \"Del control social a lo público\" de la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! Promover activamente el ejercicio del derecho al control social sobre la gestión ambiental es una obligación democrática fundamental del Estado. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 32,
    module_id: 3,
    question_text:
      "32. Tenemos un canal formal exclusivo para recibir y atender solicitudes de información pública relacionadas con el control social ambiental",
    question_type: "statement" as const,
    order_index: 32,
    recommendations: {
      "Sí - Básico":
        "Fortalezcan el canal existente haciéndolo más visible y accesible mediante la implementación de formatos comprensibles para todos los grupos poblacionales, señalización clara en las instalaciones, publicación en múltiples medios y desarrollo de protocolos de atención que garanticen respuestas oportunas; para ello, pueden crear guías de uso del canal, establecer tiempos máximos de respuesta y capacitar al personal encargado, cumpliendo con el artículo 8 de la Ley 1712 de 2014 y los artículos 5 y 6 del Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Mejoren el canal formal garantizando su visibilidad y accesibilidad mediante la integración de herramientas digitales, presenciales y telefónicas que faciliten el ejercicio efectivo del control social ambiental; esto incluye crear formularios simplificados, establecer sistemas de seguimiento de solicitudes, implementar mecanismos de retroalimentación ciudadana y desarrollar indicadores de satisfacción que fortalezcan la participación y transparencia, alineándose con la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Consoliden el canal formal de participación integrándolo con los sistemas de gestión documental y desarrollando plataformas tecnológicas avanzadas para el seguimiento automatizado de solicitudes, generación de reportes y retroalimentación continua; para ello, pueden implementar sistemas de gestión de calidad, crear dashboards de seguimiento, establecer encuestas de satisfacción automatizadas y desarrollar herramientas de análisis de datos que optimicen el control social ambiental, cumpliendo con la Ley 1757 de 2015, la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      No: "¡ALERTA! Establezcan un canal formal exclusivo que permita a la ciudadanía acceder a información y participar efectivamente en el control social ambiental, mediante la creación de procedimientos claros, formatos accesibles, sistemas de seguimiento y mecanismos de retroalimentación que garanticen la participación activa y transparencia, en cumplimiento con el artículo 8 de la Ley 1712 de 2014, la Ley 1757 de 2015 y el Acuerdo de Escazú.",
      "No aplica":
        "¡ALERTA! Tener un canal formal para solicitudes de información relacionadas con control social ambiental es una obligación de transparencia y participación democrática. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 33,
    module_id: 3,
    question_text:
      "33. Diseñamos y ejecutamos la audiencia de rendición de cuentas de nuestra entidad con el objetivo de que la ciudadanía de nuestro territorio evalúe nuestra gestión ambiental y los resultados de la toma de decisiones ambientales",
    question_type: "statement" as const,
    order_index: 33,
    recommendations: {
      "Sí - Básico":
        "Establezcan un proceso formal de rendición de cuentas donde la ciudadanía pueda evaluar la gestión ambiental de la entidad, desarrollando metodologías participativas, cronogramas accesibles y espacios de diálogo efectivo; para ello, pueden crear presentaciones en lenguaje claro, utilizar herramientas visuales, programar sesiones en horarios convenientes para la comunidad y establecer mecanismos de preguntas y respuestas que garanticen la transparencia, siguiendo la Ley 1712 de 2014 y los principios de participación de la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Formalicen y estructuren un proceso integral de rendición de cuentas que permita a la ciudadanía evaluar comprehensivamente la gestión ambiental mediante audiencias inclusivas, accesibles y culturalmente apropiadas; esto incluye desarrollar formatos comprensibles para todos los grupos poblacionales, especialmente los vulnerables, implementar mecanismos de retroalimentación sistemática y crear protocolos de seguimiento que permitan la mejora continua, en línea con la Ley 1757 de 2015, la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Fortalezcan el proceso de rendición de cuentas integrando tecnologías accesibles, herramientas de análisis de datos y sistemas de retroalimentación avanzados que faciliten la participación ciudadana y mejoren la toma de decisiones ambientales; para ello, pueden desarrollar plataformas digitales interactivas, implementar encuestas de satisfacción en tiempo real, crear dashboards de gestión ambiental y establecer sistemas de seguimiento automatizado de compromisos adquiridos, alineándose con la Ley 1757 de 2015, la Ley 1712 de 2014 y el Acuerdo de Escazú.",
      No: "¡ALERTA! Diseñen e implementen un proceso formal de rendición de cuentas donde la ciudadanía pueda evaluar la gestión ambiental de la entidad, mediante la creación de espacios participativos, información clara y accesible, y mecanismos de retroalimentación que fortalezcan la confianza y mejoren la toma de decisiones ambientales, de acuerdo con el artículo 8 de la Ley 1712 de 2014, la Ley 1757 de 2015 y los lineamientos del Acuerdo de Escazú.",
      "No aplica":
        "¡ALERTA! La rendición de cuentas sobre gestión ambiental es una obligación de transparencia y control democrático fundamental. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 34,
    module_id: 3,
    question_text:
      "34. Usamos la información de la evaluación ciudadana de la rendición de cuentas para la mejora de nuestra gestión ambiental",
    question_type: "statement" as const,
    order_index: 34,
    recommendations: {
      "Sí - Básico":
        "Utilicen la información obtenida de la evaluación ciudadana en el proceso de rendición de cuentas para identificar áreas de mejora en la gestión ambiental; para ello, pueden estructurar un sistema sencillo de recopilación y organización de comentarios y sugerencias ciudadanas, crear matrices de análisis de retroalimentación, establecer categorías de mejora priorizadas y desarrollar cronogramas de implementación que aseguren que esta retroalimentación sea tomada en cuenta para ajustar de manera progresiva las políticas y acciones ambientales de la entidad.",
      "Sí - Intermedio":
        "Formalicen el proceso de retroalimentación ciudadana tras la rendición de cuentas, utilizando la información obtenida para realizar ajustes estratégicos en la gestión ambiental mediante el establecimiento de mecanismos claros para incorporar las sugerencias y críticas en la planificación y ejecución de proyectos ambientales; esto incluye crear comités de evaluación, desarrollar protocolos de seguimiento, implementar sistemas de monitoreo de mejoras y establecer indicadores de efectividad que mejoren la transparencia y eficiencia.",
      "Sí - Avanzado":
        "Integren un sistema formal y sistemático para el uso de la información obtenida de la evaluación ciudadana en la rendición de cuentas, asegurando que esta retroalimentación se utilice para la mejora continua de la gestión ambiental; para ello, pueden implementar herramientas tecnológicas de análisis de datos, desarrollar dashboards de seguimiento, crear sistemas automatizados de priorización de mejoras, establecer protocolos de comunicación de cambios y garantizar la transparencia en cómo se incorporan estas sugerencias y se comunican los resultados a la ciudadanía.",
      No: "¡ALERTA! Implementen de inmediato un mecanismo para recoger y utilizar la retroalimentación ciudadana proveniente de la rendición de cuentas, mediante la creación de sistemas de recopilación, análisis y seguimiento que permitan responder de manera efectiva a las preocupaciones y sugerencias de la ciudadanía, fortaleciendo la transparencia, legitimidad y participación comunitaria en las decisiones ambientales.",
      "No aplica":
        "¡ALERTA! Usar la información de la evaluación ciudadana para mejorar la gestión ambiental es fundamental para la mejora continua y la legitimidad democrática. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  {
    id: 35,
    module_id: 3,
    question_text: "35. Diseñamos diálogos de rendición de cuentas para la toma de decisiones ambientales",
    question_type: "statement" as const,
    order_index: 35,
    recommendations: {
      "Sí - Básico":
        "Fortalezcan los diálogos de rendición de cuentas desarrollando metodologías participativas, formatos accesibles y canales de comunicación efectivos que aseguren que sean utilizados para ajustar las decisiones ambientales; para ello, pueden crear guías de facilitación, establecer cronogramas regulares, utilizar herramientas visuales y desarrollar protocolos de seguimiento que garanticen la participación ciudadana, alineándose con la Ley 1712 de 2014, el Acuerdo de Escazú y el artículo 8 de la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Fortalezcan los diálogos de rendición de cuentas garantizando su accesibilidad y efectividad mediante la implementación de múltiples formatos (presenciales, virtuales, híbridos), metodologías inclusivas y sistemas de seguimiento que aseguren que los resultados se utilicen efectivamente en la toma de decisiones ambientales; esto incluye crear espacios diferenciados para diferentes grupos poblacionales, establecer mecanismos de retroalimentación y desarrollar indicadores de impacto, conforme a la Ley 1712 de 2014, el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Optimicen los diálogos de rendición de cuentas integrando herramientas tecnológicas avanzadas, metodologías innovadoras de participación y sistemas de evaluación continua que permitan la inclusión de diversas poblaciones y proporcionen espacios de retroalimentación permanente; para ello, pueden desarrollar plataformas digitales interactivas, implementar técnicas de facilitación especializada, crear sistemas de análisis de datos participativos y establecer protocolos de mejora continua, alineándose integralmente con la Ley 1712 de 2014, el Acuerdo de Escazú y la Ley 1757 de 2015.",
      No: "¡ALERTA! Inicien el diseño de diálogos de rendición de cuentas estructurados de manera accesible e inclusiva, utilizando tecnologías apropiadas y garantizando que los resultados se utilicen para ajustar las decisiones ambientales, mediante el establecimiento de procesos continuos de participación ciudadana que mejoren la transparencia y la toma de decisiones, en alineación con la Ley 1712 de 2014, el Acuerdo de Escazú y la Ley 1757 de 2015.",
      "No aplica":
        "¡ALERTA! Diseñar diálogos de rendición de cuentas para la toma de decisiones ambientales es fundamental para la participación democrática y la transparencia. Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.",
    },
  },
  // Preguntas adicionales 36 y 37
  {
    id: 36,
    module_id: 3,
    question_text:
      "36. Describan las principales fortalezas de nuestra entidad en materia de transparencia, participación y evaluación ambiental",
    question_type: "open" as const,
    order_index: 36,
    recommendations: {
      general:
        "Sistematicen y documenten las fortalezas identificadas como buenas prácticas institucionales mediante la creación de protocolos, manuales y herramientas replicables; utilicen esta información para fortalecer los procesos existentes, desarrollar programas de capacitación interna, crear redes de intercambio de experiencias y compartir conocimientos con otras entidades del territorio, contribuyendo al fortalecimiento del sistema ambiental regional.",
    },
  },
  {
    id: 37,
    module_id: 3,
    question_text:
      "37. Identifiquen los principales retos y oportunidades de mejora en la implementación de los derechos de acceso en asuntos ambientales",
    question_type: "open" as const,
    order_index: 37,
    recommendations: {
      general:
        "Elaboren un plan de mejoramiento institucional integral basado en los retos identificados, estableciendo metas SMART (específicas, medibles, alcanzables, relevantes y temporales), asignando responsables claros, definiendo cronogramas específicos, desarrollando indicadores de seguimiento y creando mecanismos de evaluación continua para avanzar de manera efectiva en la implementación de los derechos de acceso a la información, participación ciudadana y acceso a la justicia en asuntos ambientales, conforme al Acuerdo de Escazú y la normatividad nacional vigente.",
    },
  },
]
