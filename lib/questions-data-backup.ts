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
];

export const responseOptionsData = [
  {
    id: 1,
    option_text: "Sí - Básico",
    points: 1,
    excludes_from_calculation: false,
  },
  {
    id: 2,
    option_text: "Sí - Intermedio",
    points: 2,
    excludes_from_calculation: false,
  },
  {
    id: 3,
    option_text: "Sí - Avanzado",
    points: 3,
    excludes_from_calculation: false,
  },
  { id: 4, option_text: "No", points: 0, excludes_from_calculation: false },
  {
    id: 5,
    option_text: "No aplica",
    points: 0,
    excludes_from_calculation: true,
  },
];

export const questionsData = [
  {
    id: 1,
    module_id: 1,
    question_text:
      "1. Actualizamos el menú transparencia y acceso a la información de manera mensual",
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
    question_text: "2. Actualizamos el menú participa de manera mensual",
    question_type: "statement" as const,
    order_index: 2,
    recommendations: {
      "Sí - Básico":
        'Revisen los requisitos establecidos en la Resolución 1519 de 2020 para el menú "Participa" y realicen los ajustes necesarios en la página web para asegurar su cumplimiento. Socialicen estos lineamientos con las áreas responsables responsables de promover la participación ciudadana y definan, de forma conjunta, criterios que garanticen la publicación oportuna y clara de la información ambiental relacionada.',
      "Sí - Intermedio":
        'Establezcan un sistema claro y práctico para la actualización de la información ambiental en el menú "Participa", a través de un protocolo, procedimiento o instructivo que defina cómo y cuándo las áreas responsables de promover la participación en su entidad, deben remitir la información correspondiente para su publicación. Aseguren la socialización de este sistema con los equipos involucrados y desarrollen espacios de capacitación para fortalecer su implementación.',
      "Sí - Avanzado":
        "Continúen con la actualización periódica y oportuna de los espacios, actividades y contenidos que promueven la participación ciudadana ambiental, como convocatorias, espacios de diálogo, talleres e informes. Incorporen los resultados de estas actividades, la visibilización de compromisos asumidos, el seguimiento realizado, el uso de datos abiertos y la publicación de informes en lenguaje claro. Aseguren también mecanismos que permitan a la ciudadanía brindar retroalimentación sobre estos procesos.",
      No: '¡ALERTA! La normatividad vigente exige actualizar de manera periódica y oportuna de los espacios, actividades y contenidos que promueven la participación ciudadana ambiental. Establezcan un cronograma de actualización mensual del menú "Participa", en cumplimiento del Decreto 1499 de 2017, la Resolución 1519 de 2020, los lineamientos de Gobierno Digital y el Acuerdo de Escazú. Aseguren que esta actualización impulse mecanismos efectivos de participación ciudadana.',
      "No aplica":
        '¡ALERTA! La normatividad vigente relacionada con el acceso a la información para la participación ambiental (Decreto 1499 de 2017, la resolución 1519 de 2020, los lineamientos de Gobierno Digital y el Acuerdo de Escazú) obliga a tener lineamientos (protocolo, guía, instructivo, procedimiento, etc) en el que se establezca los pasos y responsabilidades para la actualización de la información ambiental del menú "Participa". Pidan un concepto al área juridica para asegurar que en realidad esto no aplica a su entidad.',
    },
  },
  {
    id: 3,
    module_id: 1,
    question_text:
      "3. Actualizo la información correspondiente a planes y programas de proyectos ambientales de manera mensual",
    question_type: "statement" as const,
    order_index: 3,
    recommendations: {
      "Sí - Básico":
        "Actualice mensualmente la información relacionada con planes, programas y proyectos ambientales, garantizando los principios de transparencia y máxima publicidad consagrados en la Ley 1712 de 2014 y en el Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Revise periodicamente la totalidad de planes y proyectos ambientales, complete con la información que haga falta y actualice en su página web. Presente la información de manera clara y comprensible.",
      "Sí - Avanzado":
        "Continúe con la publicación de los planes y programas de los proyectos ambientales de manera mensual, mantega actualizada la información al respecto. Publique en formatos abiertos en concordancia con la Ley 1712 de 2014, las directrices del CONPES 3920 y del Acuerdo de Escazú. Incluya seguimiento e indicadores de seguimiento.",
      No: "Identifique los planes y programas de proyectos ambientales, organice la información de cada uno y realice la publicación correspondiente.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 4,
    module_id: 1,
    question_text:
      "4. Mi página es accesible para todas las poblaciones diferenciales de mi territorio",
    question_type: "statement" as const,
    order_index: 4,
    recommendations: {
      "Sí - Básico":
        "Identifique los grupos poblaciones de su territorio y las necesidades de accesibilidad de cada uno. Inicie por identificar e incorporar criterios de accesibilidad y enfoque diferencial de los grupos poblacionales de su terrorio, elaboré una ruta o plan de trabajo.",
      "Sí - Intermedio":
        "Revise los criterios de accesibilidad establecidos en la resolución 1519 de 2020 (anexo técnico 1 -Guía de Accesibilidad de Contenidos Web - WCAG) y del artículo 14 del Decreto 2106 de 2019, identifique cuáles esta cumpliendo, cuáles tiene pendiente por implementar y que recursos necesitaria para ello. Elabore una ruta o plan de trabajo que le permita avanzar en su implementación de una manera racional.",
      "Sí - Avanzado":
        "Garantice que la página web institucional cumpla con los estándares de accesibilidad definidos de la resolución 1519 de 2020 (anexo técnico 1 -Guía de Accesibilidad de Contenidos Web - WCAG) y del artículo 14 del Decreto 2106 de 2019, permitiendo el acceso efectivo de todas las poblaciones diferenciales del territorio. Incorpore acciones innovadoras que mejoren la accesibilidad, realice validadiciones con los grupo poblacionales de su territorio.",
      No: "Revise los criterios de accesibilidad establecidos en la resolución 1519 de 2020 (anexo técnico 1 - Guía de Accesibilidad de Contenidos Web - WCAG) y del artículo 14 del Decreto 2106 de 2019, y elabore una ruta o plan de trabajo que le permita iniciar con su implementación de una manera racional.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 5,
    module_id: 1,
    question_text:
      "5. He hecho pruebas de sistema de lenguaje claro en mi página",
    question_type: "statement" as const,
    order_index: 5,
    recommendations: {
      "Sí - Básico":
        "Complemente las acciones realizadas con pruebas de comprensión aplicadas a ciudadanos y ciudadanas, centradas en contenidos claves como trámites, normativas o decisiones ambientales. Estas pruebas deben enfocarse en identificar dificultades en el entendimiento de la información y establecer ajustes que favorezcan la transparencia. Se sugiere emplear los instrumentos y guías de la Estrategia Nacional de Lenguaje Claro (DAFP) como base metodológica y priorizar los contenidos que inciden directamente en el ejercicio del derecho al acceso a la información ambiental según La Ley 1712 de 2014, Acuerdo de Escazú y Decreto 1499 de 2017.",
      "Sí - Intermedio":
        "Institucionalice la implementación del lenguaje claro mediante protocolos que integren validaciones sistemáticas con públicos diversos, en especial aquellos con mayores barreras de acceso, como comunidades rurales, grupos étnicos o personas con baja escolaridad. Este proceso debe alinearse con los principios y herramientas de la Estrategia Nacional de Lenguaje Claro (DAFP), asegurando la claridad en la comunicación pública y reforzando el acceso efectivo y no discriminatorio a la información ambiental. Según La Ley 1712 de 2014, Acuerdo de Escazú y Decreto 1499 de 2017.",
      "Sí - Avanzado":
        "Consolide la experiencia institucional mediante la sistematización de buenas prácticas, enfocadas en la garantía del derecho de acceso a la información ambiental. Esta sistematización puede traducirse en manuales, protocolos o informes como parte de los indicadores de gestión y rendición de cuentas institucional. Según La Ley 1712 de 2014, Acuerdo de Escazú y Decreto 1499 de 2017.",
      No: "Inicie un diagnóstico básico de los contenidos publicados en la página web institucional, especialmente aquellos relacionados con los derechos de acceso a la información ambiental. Como parte del compromiso con la transparencia, se sugiere aplicar los lineamientos de la Estrategia Nacional de Lenguaje Claro del Departamento Administrativo de la Función Pública (DAFP), los cuales promueven el uso de un lenguaje accesible, directo y comprensible para toda la ciudadanía. Según La Ley 1712 de 2014, Acuerdo de Escazú y Decreto 1499 de 2017.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 6,
    module_id: 1,
    question_text:
      "6. Dentro de mi página web los canales de contacto son visibles y accesibles a todas las poblaciones diferenciales de mi territorio",
    question_type: "statement" as const,
    order_index: 6,
    recommendations: {
      "Sí - Básico":
        "Revise los criterios establecidos en el Decreto 1499 de 2017 (en lo referene al relacionamiento Estado-Ciudadano), la Ley 1712 de 2014, la resolución 1519 de 2020 (anexo técnico 2) y el Acuerdo de Escazú, y realice las adecuaciones necesarias para que sus canales de contacto sean visibles, accesibles y adaptados a las necesidades de las poblaciones diferenciales",
      "Sí - Intermedio":
        "Revise los criterios de enfoque diferencial e incorpore a sus canales de contacto para garantizar la inclusión y participación de los grupos poblaciones de su territorio.",
      "Sí - Avanzado":
        "Realice seguimiento a los canales de contacto, asegure que se encuentren visibles, que sean accesibles y adaptados a las necesidades de las poblaciones diferenciales, en línea con la Ley 1712 de 2014 y la Resolcuón 1519 de 2020 (anexo técnico 2). Optimice los canales de contacto, revise formatos y valide accesibilidad.",
      No: "Revise los criterios establecidos en el Decreto 1499 de 2017 (en lo referene al relacionamiento Estado-Ciudadano), la Ley 1712 de 2014, la resolución 1519 de 2020 (anexo técnico 2), el Acuerdo de Escazú y elabore una ruta o plan de trabajo que le permita iniciar con su implementación de una manera racional.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
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
        "Identifique las causas en los que se han presentados los incumplimientos e implemente acciones de mejora para evitar que vuelvan a presentarse.",
      "Sí - Intermedio":
        "Analice los casos en los que no se han cumplido los terminos de ley y tome las acciones puntuales para evitar su nueva ocurrencia.",
      "Sí - Avanzado":
        "Realice seguimiento permanente y garantice que las respuestas a las PQRS ambientales se entreguen dentro de los términos establecidos por la Ley 1755 de 2015, cumpliendo con los principios de legalidad, celeridad y eficacia en la gestión pública. Publique un informe con estadísticas, tiemposde respuesta y mejora continua, de cuerdo a la resloción 1519 de 2020 (Anexo técnico 2).",
      No: "Elabore o revise el protocolo de atención a PQRS e identifique las causas que impiden cumplir con los tiempos estipulados por la ley para entregar las respuestas. Implemente acciones de mejora.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 8,
    module_id: 1,
    question_text:
      "8. Tengo establecidos claramente los criterios para denegar solicitudes de información ambiental",
    question_type: "statement" as const,
    order_index: 8,
    recommendations: {
      "Sí - Básico":
        "Elabore el índice de información clasificada y reservada (uno de los instrumentos de la información obligatorios por la Ley 1712 de 2014). Si ya lo tiene revisélo y actualícelo. Defina claramente los criterios para denegar solicitudes de información ambiental, conforme a las causales previstas en el artículo 18 de la Ley 1712 de 2014, asegurando transparencia y motivación adecuada.",
      "Sí - Intermedio":
        "Revise el índice de información clasificada y reservada, verifique que contegan claramente los criterios para denegar solicitudes de información ambiental, conforme a las causales previstas en el artículo 18 de la Ley 1712 de 2014, asegurando transparencia y motivación adecuada. Verifique que se encuentra adoptado formalmente mediante acto administravo, actualice de ser necesario. Socialice y capacite tanto a servidores como a la ciudadanía respecto a las causales previstas en el artículo 18 de la Ley 1712 de 2014 para la denegación de información.",
      "Sí - Avanzado":
        "Mantenga el índice de información clasificada y reservada actualizado con los actos, documentos e informaciones calificados como clasificados o reservados, de conformidad la Ley 1712 de 2014 y al Acuerdo de Escazú. El índice incluirá sus denominaciones, la motivación y la individualización del acto en que conste tal calificación.",
      No: "Revise los criterios establecidos en el artículo 18 de la Ley 1712 de 2014 y en el Acuerdo de Escazú, respecto a los criterios, procedimientos, definiciones e instrumentos para la denegación de la información y elabore una ruta o plan de trabajo que le permita avanzar y dar cumplimiento a la normatividad.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 9,
    module_id: 1,
    question_text:
      "9. Conozco la prueba de interés público para determinar la denegación de información",
    question_type: "statement" as const,
    order_index: 9,
    recommendations: {
      "Sí - Básico":
        "Revise en el Acuerdo de Escazú y en la Ley 1712 de 2024 los criterios de denegación de información, entrega parcial de la información y la aplicación de la prueba de interés público. Determine en que casos y ocasiones procede la aplicación de la prueba de interés público y elabore un protocolo (procedimiento, guía, instrumento) que determine los criterios, roles y responsabilidades para su aplicación. Socialice y capacite.",
      "Sí - Intermedio":
        "Realice seguimiento e identifique los casos en los que ha tenido que aplicar la prueba de interés público con sus debida justificacines (técnica y jurídica). Lleve indicadores al respecto.",
      "Sí - Avanzado":
        "Realice seguimiento periodico, mantega cifras actualizadas, documente los casos con análisis detallado (tipo de información, justificación técnica y jurídica, tiempos, resultados) en los que tuvo que aplicar la prueba de interés público. Mantenga trazabilidad, gestione el conocimiento y publique la información.",
      No: "Revise en el Acuerdo de Escazú y en la Ley 1712 de 2024 los criterios de denegación de información, entrega parcial de la información y la aplicación de la prueba de interés público y establezca con claridad en qué casos procede su aplicación. Estableza ruta o plan de trabajo para interiorizar y aplicar al interior de la entidad.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 10,
    module_id: 1,
    question_text:
      "10. Cuento con formatos alternativos, accesibles y comprensibles para que la ciudadanía pueda acceder a la información ambiental y servicios de manera efectiva, incluyendo a la población en situación de vulnerabilidad.",
    question_type: "statement" as const,
    order_index: 10,
    recommendations: {
      "Sí - Básico":
        "Diseñe formatos alternativos, accesibles y comprensibles que faciliten el acceso a la información ambiental y a los servicios institucionales, en cumplimiento de la Ley 1712 de 2024, la Resolución 1519 de 2020 (anexo técnico 1), el Acuerdo de Escazú, la Ley 1346 de 2009 y los principios de accesibilidad universal.",
      "Sí - Intermedio":
        "Verifique que la totalidad de sus formatos sean alternativos, accesibles y comprensibles de acuerdo con los criterios establecidos en la Ley 1712 de 2024, la Resolución 1519 de 2020 (anexo técnico 1), el Acuerdo de Escazú, la Ley 1346 de 2009 y los principios de accesibilidad universal, y realice los ajustes correspondientes para facilitar el acceso a la información ambiental y a los servicios intitucionales.",
      "Sí - Avanzado":
        "Realice seguimiento al uso de sus formatos, verifique que accesibilidad según la población objetivo, implemente mejoras y mantenga actualizados.",
      No: "Revise los criterios de accesibilidad para formatos, establecidos en la Ley 1712 de 2024, la Resolución 1519 de 2020 (anexo técnico 1), el Acuerdo de Escazú, la Ley 1346 de 2009 y los principios de accesibilidad universal y coteje frente a sus formatos y establezca una ruta o plan de trabajo para realizar la adecuación de los formatos.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 11,
    module_id: 1,
    question_text:
      "11. He definido costos asociados con la entrega de información ambiental razonables y transparentes",
    question_type: "statement" as const,
    order_index: 11,
    recommendations: {
      "Sí - Básico":
        "Elabore y publique acto administrativo sobre costos de reproducción de información pública, en el que se informe los costos de reproducción individualizado por costo unitario de los diferentes formatos a través de los cuales se puede reproducir la información.",
      "Sí - Intermedio":
        "Revise el acto administrativo sobre costos de reproducción y actualice, verifique que los costos definidos sean razonables y transparentes, basados en la normatividad vigente. Publique actualización e informe claramente sobre los costos de reproducción.",
      "Sí - Avanzado":
        "Mantenga costos de reprodución publicados (con análisis basado en la normatividad), el acto admistrativo que los adopta actualizado, realice revisión anual participativa.",
      No: "Revise la normatividad vigente (articulo 26 de la Ley 1712 de 2014, resolución 1519 de 2020, Acuerdo de Escazú) y establezca los costos de reproducción (razonables y transparentes) asociados a la entrega de información ambiental, evitando barreras económicas de acceso.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  // Módulo 2 - Preguntas 12-19
  {
    id: 12,
    module_id: 2,
    question_text:
      "12. Informamos a nuestra ciudadanía de manera trimestral sobre su derecho al acceso de la información ambiental (por medios físicos, remotos y locales de comunicación)",
    question_type: "statement" as const,
    order_index: 12,
    recommendations: {
      "Sí - Básico":
        "Diseñar un plan básico de divulgación trimestral que defina responsables, medios disponibles (como carteleras, boletines o redes sociales) y un cronograma mínimo para iniciar la comunicación regular sobre el derecho al acceso a la información ambiental.",
      "Sí - Intermedio":
        "Fortalecer la estrategia mediante la estandarización y calendarización de las acciones de comunicación, asegurando que la información llegue de forma constante a diferentes grupos poblacionales mediante una combinación de medios físicos y digitales.",
      "Sí - Avanzado":
        "Implementar mecanismos de retroalimentación ciudadana para verificar la comprensión y utilidad de la información difundida, e incorporar ajustes basados en estos insumos para mejorar la efectividad de la estrategia.",
      No: "Profundizar la evaluación de impacto con indicadores cualitativos y cuantitativos, y replicar la estrategia en otros territorios o entidades como buena práctica institucional, promoviendo su adaptación a contextos diversos.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 13,
    module_id: 2,
    question_text:
      "13. Tengo un registro de emisiones y transferencias de contaminantes al aire, agua, suelo y subsuelo bajo su jurisdicción conforme a la normatividad aplicable",
    question_type: "statement" as const,
    order_index: 13,
    recommendations: {
      "Sí - Básico":
        "Implementar un sistema básico de registro que permita comenzar la recolección estructurada de datos sobre emisiones y transferencias de contaminantes, asegurando al menos un formato estándar para reportes internos.",
      "Sí - Intermedio":
        "Desarrollar un mecanismo de consolidación y sistematización de los datos existentes, estableciendo procedimientos periódicos de actualización y validación para mejorar la calidad del registro.",
      "Sí - Avanzado":
        "Ampliar la interoperabilidad del sistema con otras bases de datos ambientales y asegurar el cumplimiento de estándares de calidad de datos, fortaleciendo capacidades técnicas del personal encargado.",
      No: "Se recomienda iniciar y mantener un registro actualizado de emisiones y transferencias de contaminantes al aire, agua, suelo y subsuelo, conforme a los lineamientos del RUA, el PRTR Colombia y la normativa ambiental vigente, como parte del cumplimiento del artículo 6 del",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 14,
    module_id: 2,
    question_text:
      "14. Garantizo la divulgación inmediata de información en caso de una amenaza inminente a la salud pública o al medio ambiente",
    question_type: "statement" as const,
    order_index: 14,
    recommendations: {
      "Sí - Básico":
        "Diseñar e implementar un protocolo básico de divulgación de información para emergencias ambientales, definiendo roles institucionales, canales de comunicación y tiempos de respuesta.",
      "Sí - Intermedio":
        "Establecer un comité interinstitucional de respuesta rápida para coordinar acciones de divulgación inmediata, reduciendo tiempos y evitando duplicidades de información.",
      "Sí - Avanzado":
        "Fortalecer la divulgación mediante capacitación continua del personal y retroalimentación de la ciudadanía para mejorar los mensajes y canales utilizados.",
      No: "Se recomienda establecer un protocolo para la divulgación inmediata de información ante una amenaza inminente a la salud pública o al ambiente, en cumplimiento del principio de precaución, el artículo 8 de la Ley 99 de 1993 y los compromisos del artículo 6 del Acuerdo de Escazú. Este protocolo puede incluir la activación de alertas tempranas a través de medios comunitarios, redes sociales institucionales, mensajes de texto masivos, radios locales y carteleras físicas en zonas afectadas. También es clave capacitar al personal responsable y articularse con los comités de gestión del riesgo y autoridades ambientales para asegurar una respuesta rápida, coordinada y efectiva.",
      "No aplica":
        "Revisar competencias teniendo en cuenta la Ley 99 de 1993 y los compromisos del artículo 6 del Acuerdo de Escazú.",
    },
  },
  {
    id: 15,
    module_id: 2,
    question_text:
      "15. Mi entidad usa y carga información de los sistemas de información ambiental (VITAL, SIAC, RUA)",
    question_type: "statement" as const,
    order_index: 15,
    recommendations: {
      "Sí - Básico":
        "Realizar una jornada de sensibilización y capacitación sobre el funcionamiento y la importancia de los sistemas VITAL, SIAC y RUA, dirigida a los equipos técnicos y administrativos. Esto ayudará a reconocer los sistemas y su relevancia institucional.",
      "Sí - Intermedio":
        "Establecer un cronograma institucional con responsables definidos para la carga periódica de información, e implementar un protocolo básico de validación de datos antes del envío.",
      "Sí - Avanzado":
        "Revisar y actualizar los procedimientos internos para mejorar la calidad de los datos cargados, asegurando la retroalimentación con los equipos técnicos y fortaleciendo la rendición de cuentas sobre los reportes generados.",
      No: "Se recomienda fortalecer el uso y la actualización oportuna de los sistemas de información ambiental como VITAL, SIAC y RUA, asegurando la carga regular de datos conforme a la normativa vigente. Esto mejora la gestión ambiental, facilita la toma de decisiones basada en evidencia y contribuye al cumplimiento de los principios de transparencia y acceso a la información establecidos en el Acuerdo de Escazú. Además, se sugiere capacitar al personal técnico y designar responsables para garantizar el funcionamiento continuo de estos sistemas.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 16,
    module_id: 2,
    question_text:
      "16. Nuestros datos ambientales siempre están disponibles en formatos editables",
    question_type: "statement" as const,
    order_index: 16,
    recommendations: {
      "Sí - Básico":
        "Se sugiere convertir los documentos PDF o formatos cerrados a formatos abiertos como Excel (XLS) o CSV, priorizando aquellos con mayor demanda o utilidad pública.",
      "Sí - Intermedio":
        "Realizar un inventario de los conjuntos de datos existentes y establece un plan progresivo para liberar todos los datos en formatos abiertos, asegurando su actualización periódica.",
      "Sí - Avanzado":
        "Mejorar la documentación de los conjuntos de datos, garantizando la inclusión de metadatos estandarizados (fecha de actualización, responsable, unidad de medida, etc.) y asegúrate de mantenerlos actualizados.",
      No: "Se recomienda adoptar la práctica de publicar los datos ambientales en formatos abiertos y editables (como .xls, .csv, .ods) en la página web institucional y en plataformas de acceso público, asegurando que estos sean fáciles de descargar, consultar y utilizar por la ciudadanía y otros actores interesados. Además, se puede crear un sistema de alertas para notificar actualizaciones de los datos y garantizar su accesibilidad continua. Es importante también establecer un proceso claro para la revisión y carga periódica de nuevos datos, y proporcionar guías de uso o tutoriales que faciliten la interpretación y análisis de la información. Por último, se sugiere capacitar a los encargados del manejo de los datos para asegurar la calidad, consistencia y actualización de la información ambiental.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 17,
    module_id: 2,
    question_text:
      "17. Medimos nuestro desempeño ambiental, implementamos un plan estructurado y documentado para mitigar impactos y promover mejoras, y divulgamos los resultados a la ciudadanía",
    question_type: "statement" as const,
    order_index: 17,
    recommendations: {
      "Sí - Básico":
        "Iniciar con la elaboración de un diagnóstico ambiental básico que identifique los principales impactos, y formular un plan mínimo con metas y acciones prioritarias para empezar el monitoreo del desempeño ambiental.",
      "Sí - Intermedio":
        "Establecer un cronograma de implementación y seguimiento del plan, con responsables definidos y rutinas de medición periódica para asegurar que los indicadores se apliquen de forma constante.",
      "Sí - Avanzado":
        "Fortalecer los canales de comunicación con la ciudadanía para divulgar los resultados de forma accesible y comprensible, e incorporar espacios de retroalimentación ciudadana.",
      No: "Se recomienda implementar un plan estructurado y documentado para medir el desempeño ambiental institucional, mitigar impactos y mejorar continuamente. Este plan debe incluir indicadores de gestión, metas claras y acciones para la mitigación de impactos, asegurando la transparencia y el cumplimiento de la normativa vigente. Los resultados deben ser divulgados de manera accesible a la ciudadanía, a través de informes periódicos, plataformas digitales y otros medios de comunicación, en coherencia con la Ley 152 de 1994 (Plan de Desarrollo) y el artículo 7 del Acuerdo de Escazú. Esta práctica no solo mejora la rendición de cuentas, sino que también fortalece la participación ciudadana en la toma de decisiones ambientales.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 18,
    module_id: 2,
    question_text:
      "18. Publico información completa sobre los procesos de toma de decisiones ambientales ( concesiones, licencias, permisos, contratos, convenios o autorizaciones , entre otros)",
    question_type: "statement" as const,
    order_index: 18,
    recommendations: {
      "Sí - Básico":
        "Diseñar un plan básico de publicación periódica (ej., mensual) que incluya al menos un formato estándar para cada tipo de documento, asegurando que haya un punto de partida claro y accesible.",
      "Sí - Intermedio":
        "Implementar mecanismos de trazabilidad, como fichas técnicas por documento y cronogramas de publicación, además de completar la información faltante para brindar un panorama más coherente y verificable.",
      "Sí - Avanzado":
        "Incorporar una auditoría interna periódica que asegure la actualización constante de la información y facilite la interoperabilidad con otras plataformas públicas o territoriales.",
      No: "Se recomienda publicar de manera accesible y completa la información sobre los procesos de toma de decisiones ambientales, tales como concesiones, licencias, permisos, contratos, convenios y autorizaciones. Esta información debe ser fácilmente consultable en plataformas en línea, en formatos abiertos y actualizados, y debe incluir detalles sobre los procedimientos, criterios de evaluación, decisiones tomadas y los impactos ambientales considerados. Esta acción contribuye a garantizar la transparencia, el acceso a la información y la participación ciudadana, en cumplimiento con los principios del artículo 6 del Acuerdo de Escazú y la Ley 1712 de 2014.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 19,
    module_id: 2,
    question_text:
      "19. Tengo una estrategia dirigida a privados, presentes en mi territorio, para que publiquen información ambiental",
    question_type: "statement" as const,
    order_index: 19,
    recommendations: {
      "Sí - Básico":
        "Realizar un diagnóstico rápido para identificar actores privados relevantes en el territorio y definir posibles temas ambientales sobre los cuales podrían compartir información. Esto servirá como base para formular una estrategia inicial.",
      "Sí - Intermedio":
        "Formalizar los lineamientos existentes en un documento guía o protocolo interno que oriente cómo involucrar a privados en la publicación de información ambiental, y realiza al menos una acción piloto.",
      "Sí - Avanzado":
        "Revisar y actualizar la estrategia institucional para incluir mecanismos de evaluación del impacto de la publicación de información ambiental por privados, y fortalece la capacidad del equipo técnico para su implementación.",
      No: "Se recomienda desarrollar una estrategia dirigida a los actores privados presentes en el territorio, con el fin de promover la publicación de información ambiental relevante. Esto puede incluir la creación de alianzas con empresas, asociaciones y organizaciones locales, brindando orientación sobre la importancia de la transparencia ambiental y cómo cumplir con las normativas vigentes. Además, se pueden establecer incentivos o compromisos voluntarios para la divulgación de datos sobre sus impactos y medidas de mitigación, contribuyendo así a la transparencia y fortaleciendo el cumplimiento del artículo 6 del Acuerdo de Escazú y la Ley 1712 de 2014 (Ley de Transparencia).",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  // Módulo 3 - Preguntas 20-35
  {
    id: 20,
    module_id: 3,
    question_text:
      "20. Tengo un plan ajustado a los marcos normativos nacionales e internacionales para asegurar la participación ciudadana en la toma de decisiones ambientales que incluye las obligaciones internacionales respecto a los derechos de los pueblos indígenas y las comunidades locales",
    question_type: "statement" as const,
    order_index: 20,
    recommendations: {
      "Sí - Básico":
        "Defina un plan completo para incorporar el enfoque étnico-territorial y el cumplimiento de los marcos normativos nacionales e internacionales en participación ambiental. Esto permitirá garantizar procesos inclusivos, culturalmente adecuados y con reconocimiento de los derechos colectivos.",
      "Sí - Intermedio":
        "Mejore la implementación del plan mediante acciones articuladas de consulta, seguimiento y formación, en concordancia con la normativa nacional e instrumentos internacionales de derechos humanos y ambientales. Se sugiere asegurar que las medidas adoptadas reflejen los principios del Acuerdo de Escazú y y La Ley 1757 de 2015 (Ley de Participación). Especialmente en relación con la participación activa y la justicia ambiental para comunidades étnicas.",
      "Sí - Avanzado":
        "Comparta el plan como una buena práctica institucional que dé cumplimiento efectivo de La Ley 1757 de 2015 (Ley de Participación) y El Acuerdo de Escazú conforme a los estándares de participación, transparencia y enfoque diferencial.",
      No: "Formule un plan de participación ciudadana ajustado a los marcos normativos nacionales e internacionales, incluyendo las obligaciones sobre los derechos de los pueblos indígenas y comunidades locales, conforme a el Acuerdo de Escazú Y La Ley 1757 de 2015 (Ley de Participación).",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 21,
    module_id: 3,
    question_text:
      "21. Tengo participación ciudadana abierta e inclusiva en las decisiones ambientales de manera transparente y teniendo en cuenta sus necesidades",
    question_type: "statement" as const,
    order_index: 21,
    recommendations: {
      "Sí - Básico":
        "Defina y Fortalezca los espacios existentes para garantizar mayor inclusión, representatividad y acceso equitativo a la información. La participación debe ser promovida activamente entre actores diversos del territorio, en cumplimiento de los principios de transparencia y no discriminación del Acuerdo de Escazú y la La Ley 1757 de 2015 (Ley de Participación).",
      "Sí - Intermedio":
        "Proponga mecanismos estructurados de retroalimentación, trazabilidad de aportes ciudadanos y estrategias de comunicación clara y accesible. Esto contribuye a una toma de decisiones ambientales más legítima y alineada conel Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      "Sí - Avanzado":
        "Añada nuevas estrategias de participación, asegurando que sean incidentes en las decisiones ambientales y cuenten con enfoques diferenciales alineadas con el Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      No: "Inicie la implementación de espacios básicos de participación, en coherencia con lo establecido por el Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación). Estos espacios deben permitir a la ciudadanía expresar sus necesidades y acceder de manera transparente a la toma de decisiones ambientales.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 22,
    module_id: 3,
    question_text:
      "22. Promuevo activamente que la ciudadanía participe en cualquier momento del proceso de toma de decisiones",
    question_type: "statement" as const,
    order_index: 22,
    recommendations: {
      "Sí - Básico":
        "Mejore la difusión y accesibilidad de los canales existentes, promoviendo activamente su uso en diversas etapas del proceso de decisión. Esto permitirá avanzar hacia una participación más informada y continua, en línea con los estándares del Acuerdo de Escazú y La Ley 1757 de 2015(Ley de Participación)",
      "Sí - Intermedio":
        "Fortalezca la estrategia de participación mediante contenidos pedagógicos, convocatorias permanentes y mecanismos de retroalimentación. Esto asegura mayor alcance y equidad en la participación, conforme a La Ley 1757 de 2015 (Ley de Participación) y a los principios de transparencia y justicia ambiental del Acuerdo de Escazú.",
      "Sí - Avanzado":
        "Proponga la participación ciudadana como un componente transversal en todas las fases de decisión ambientales de su entidad, con enfoque de derechos, trazabilidad, y evaluación participativa. conforme a La Ley 1757 de 2015 (Ley de Participación) y a los principios de transparencia y justicia ambiental del Acuerdo de Escazú.",
      No: "paciónInicie acciones que permitan a la ciudadanía participar más allá de las etapas formales de consulta, garantizando espacios abiertos y accesibles en el proceso de toma de decisiones ambientales, en línea con el Acuerdo de Escazú y conforme a La Ley 1757 de 2015 (Ley de Participación)",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 23,
    module_id: 3,
    question_text:
      "23. Informo oportunamente a la ciudadanía sobre los detalles de la participación en los procesos de toma de decisiones ambientales (por medios físicos, remotos y locales de comunicación)",
    question_type: "statement" as const,
    order_index: 23,
    recommendations: {
      "Sí - Básico":
        "Diversifique los medios de información utilizados, incluyendo formatos físicos, digitales y comunitarios, para establecer una estrategia de difusión oportuna, clara y accesible que permita a diferentes públicos conocer y acceder a los espacios de participación. conforme al principio de acceso a la información del Acuerdo de Escazú y las disposiciones de la Ley 1712 de 2014 (Ley de Transparencia).",
      "Sí - Intermedio":
        "Fortalezca la estrategia de comunicación para asegurar que toda la ciudadanía reciba información clara, en lenguaje accesible, con enfoque territorial y en tiempos adecuados. Esta práctica contribuye al ejercicio efectivo del derecho a participar y al cumplimiento del Acuerdo de Escazú y las disposiciones de la Ley 1712 de 2014 (Ley de Transparencia).",
      "Sí - Avanzado":
        "Continue con la evaluación periódica y la mejora continua de este sistema, garantizando su accesibilidad, pertinencia y adaptación a las necesidades de la ciudadanía, cumpliendo plenamente con los principios del Acuerdo de Escazú y y las disposiciones de la Ley 1712 de 2014 (Ley de Transparencia).",
      No: "Establezca canales básicos de comunicación que aseguren el acceso oportuno y claro a la información sobre procesos de participación, conforme al principio de acceso a la información del Acuerdo de Escazú y las disposiciones de la Ley 1712 de 2014 (Ley de Transparencia).",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 24,
    module_id: 3,
    question_text:
      "24. Tengo planes específicos para facilitar la participación de las comunidades impactadas directamente en los procesos de toma de decisiones ambientales",
    question_type: "statement" as const,
    order_index: 24,
    recommendations: {
      "Sí - Básico":
        "Ajuste los planes existentes para incluir acciones específicas dirigidas a las comunidades más afectadas. Esto implica garantizar canales de comunicación accesibles, tiempos adecuados para la participación y facilitar la comprensión de los procesos, cumpliendo con el enfoque diferencial del Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación)",
      "Sí - Intermedio":
        "Se recomienda mejorar la implementación de los planes, asegurando que los mecanismos de participación sean efectivos, accesibles y culturalmente apropiados para las comunidades impactadas. También se debe realizar un seguimiento a los resultados de la participación, asegurando la retroalimentación y cumplimiento de los compromisos adquiridos en base al Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación)",
      "Sí - Avanzado":
        "Consolide y documente estas prácticas como un referente institucional, promoviendo su sostenibilidad y alineación continua con las normativas internacionales y los compromisos del Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación)",
      No: "Desarrolle planes específicos para facilitar la participación activa de las comunidades directamente impactadas por los procesos de toma de decisiones ambientales. Estos planes deben cumplir con los principios de acceso a la información y participación efectiva establecidos en el Acuerdo de Escazú y en del Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 25,
    module_id: 3,
    question_text:
      "25. Informo oportunamente a los grupos directamente afectados sobre su derecho a participar en los proyectos de impacto ambiental",
    question_type: "statement" as const,
    order_index: 25,
    recommendations: {
      "Sí - Básico":
        "Mejore la difusión de la información, asegurando que todos los grupos directamente afectados conozcan de manera oportuna sus derechos de participación. La información debe ser comunicada a través de canales adecuados y accesibles, cumpliendo con los principios de equidad y transparencia establecidos en el Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      "Sí - Intermedio":
        "Fortalezca los canales de comunicación para asegurar que todos los grupos afectados reciban la información de manera clara, comprensible y accesible. Además, se debe garantizar que la información llegue con suficiente antelación, permitiendo la participación informada en todas las etapas del proceso, como establece el Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      "Sí - Avanzado":
        "Continue consolidando estos procesos, promoviendo su sostenibilidad y evaluando continuamente la efectividad de los canales utilizados, para garantizar una participación inclusiva y alineada con los principios del Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      No: "establezca mecanismos básicos para informar a los grupos directamente afectados sobre su derecho a participar en los proyectos de impacto ambiental. Esta información debe ser clara, accesible y proporcionada en momentos clave del proceso decisional, conforme al principio de acceso a la información del Acuerdo de Escazú y La Ley 1757 de 2015 (Ley de Participación).",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 26,
    module_id: 3,
    question_text:
      "26. Tengo una estrategia para asegurar que las observaciones de la ciudadanía sean consideradas y contribuyan en los procesos de toma de decisiones",
    question_type: "statement" as const,
    order_index: 26,
    recommendations: {
      "Sí - Básico":
        "Fortalezca el proceso de recepción de observaciones incorporando mecanismos de trazabilidad interna. Esto permitirá dar seguimiento a los aportes recibidos y avanzar hacia una participación más transparente e incidente, dando cumplimiento a los principios del Acuerdo de Escazú en materia de participación y La Ley 1757 de 2015 (Ley de Participación)",
      "Sí - Intermedio":
        "Consolide la estrategia institucional para asegurar que las observaciones sean sistemáticamente documentadas, analizadas y respondidas. Esto refuerza la rendición de cuentas y da cumplimiento a los principios del Acuerdo de Escazú en materia de participación y La Ley 1757 de 2015 (Ley de Participación).",
      "Sí - Avanzado":
        "Proponga nuevas practicas, asegurando que todas las observaciones sean claramente reflejadas en las decisiones finales y que el sistema siga siendo accesible y evaluado de forma continua para garantizar la máxima transparencia y efectividad en la participación ciudadana.",
      No: "Establezca una estrategia básica que permita recopilar, organizar y considerar las observaciones ciudadanas dentro del proceso decisorio. Esto representa un primer paso hacia el cumplimiento de los estándares de participación efectiva del Acuerdo de Escazú La Ley 1757 de 2015 (Ley de Participación)",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 27,
    module_id: 3,
    question_text:
      "27. Informo oportunamente a la ciudadanía sobre la decisión ambiental final y los motivos que la sustentan",
    question_type: "statement" as const,
    order_index: 27,
    recommendations: {
      "Sí - Básico":
        "Mejore la forma en que se informa a la ciudadanía sobre las decisiones ambientales, pasando de una comunicación básica a una más clara, accesible y detallada. Es importante explicar no solo la decisión, sino también sus fundamentos técnicos y jurídicos. Además, se deben usar canales efectivos y comprensibles para todos los públicos. Esto refuerza el cumplimiento de la Ley 1712 de 2014 y del Acuerdo de Escazú. Una comunicación más completa fortalece la transparencia y la participación ciudadana.",
      "Sí - Intermedio":
        "Avance hacia un nivel más sólido de divulgación de las decisiones ambientales, complementando la información básica con explicaciones más claras y detalladas sobre los fundamentos técnicos, jurídicos y ambientales que las sustentan. También se recomienda emplear formatos accesibles y canales efectivos para llegar a diversos públicos. Esto permite fortalecer la transparencia institucional y dar cumplimiento a lo establecido en la Ley 1712 de 2014 y el Acuerdo de Escazú, promoviendo una participación ciudadana más informada y significativa.",
      "Sí - Avanzado":
        "Podría en caso de no tenerlo elaborar una estrategia de comunicación clara y multiformato que facilite la comprensión de las decisiones ambientales y sus fundamentos. En donde ademas se incluyan mecanismos de retroalimentación ciudadana y evaluación del impacto informativo. Esto refuerza el cumplimiento normativo y promueve una participación ambiental efectiva. Lo que podría posiicionar a la entidad como referente en transparencia y participación ambiental efectiva.",
      No: "Revise la normativa vigente relacionada con el acceso a la información pública, en especial la Ley 1712 de 2014, conocida como la Ley de Transparencia y del Derecho de Acceso a la Información Pública Nacional. En caso de que la entidad o territorio pertenezca a la Región Metropolitana Bogotá-Cundinamarca, también debe considerarse la Ley 2199 de 2022, que establece disposiciones específicas sobre gobernanza regional y acceso a la información. Además, dado que Colombia es signataria y ha ratificado el Acuerdo de Escazú, se debe cumplir con lo establecido en su articulado, que garantiza el derecho de acceso a la información, la participación pública y el acceso a la justicia en asuntos ambientales.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 28,
    module_id: 3,
    question_text:
      "28. Facilito la participación de comunidades que hablen idiomas distintos al idioma oficial",
    question_type: "statement" as const,
    order_index: 28,
    recommendations: {
      "Sí - Básico":
        "Fortalezca la accesibilidad de la información pública mediante formatos alternativos, comprensibles y multilingües, conforme al Artículo 8 y 17 de la Ley 1712 de 2014. Igualmente, se deben adecuar los canales digitales y físicos para facilitar el acceso a grupos étnicos, culturales y personas con discapacidad. Esto en concordancia con el Artículo 6.6 del Acuerdo de Escazú, que exige divulgación en formatos accesibles y comprensibles. Mejorar estos aspectos permitirá un acceso más equitativo y efectivo a la información ambiental.",
      "Sí - Intermedio":
        "Mejore la accesibilidad de la información pública, cumpliendo con el Artículo 8 y 17 de la Ley 1712 de 2014 y el Artículo 6.6 del Acuerdo de Escazú, garantizando su divulgación en diversos idiomas y formatos accesibles. Además, es necesario alinear los sistemas de información con los procedimientos establecidos y adaptarlos para grupos étnicos, culturales y personas con discapacidad.",
      "Sí - Avanzado":
        "Consolide la estrategia de accesibilidad mediante la divulgación proactiva de información en idiomas y formatos alternativos, conforme al Artículo 8 y 17 de la Ley 1712 de 2014 y el Artículo 6.6 del Acuerdo de Escazú. Se sugiere integrar mecanismos de evaluación del impacto y asegurar que los sistemas de información sean inclusivos, alineados con el Programa de Gestión Documental, y permitan una participación ciudadana efectiva.",
      No: "Inicie el cumplimiento del Artículo 8 y 17 de la Ley 1712 de 2014 y del Artículo 6.6 del Acuerdo de Escazú, adoptando medidas para garantizar el acceso a la información en idiomas, formatos y canales accesibles. Es clave adecuar los sistemas de información y medios de comunicación para llegar efectivamente a grupos étnicos, culturales y personas con discapacidad, asegurando su derecho a estar informados.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 29,
    module_id: 3,
    question_text:
      "29. Tengo criterios claros para criterios determinar qué personas o comunidades están directamente afectados por un proyecto o decisión ambiental",
    question_type: "statement" as const,
    order_index: 29,
    recommendations: {
      "Sí - Básico":
        "Inicie la definición de criterios objetivos y públicos para identificar a las personas o comunidades directamente afectadas por decisiones ambientales, conforme al Artículo 5 y 6 del Acuerdo de Escazú, que exige garantizar la participación desde etapas tempranas. Esto debe complementarse con mecanismos básicos de consulta y acceso a la información, en línea con la Ley 1712 de 2014 y la Ley 1757 de 2015.",
      "Sí - Intermedio":
        "Fortalezca y sistematice los criterios existentes, asegurando que sean aplicados de forma coherente, inclusiva y con enfoque territorial y diferencial, en cumplimiento del Artículo 5 y 6 del Acuerdo de Escazú. Además, se sugiere garantizar que los grupos identificados tengan acceso oportuno a información pública, según Ley 1712 de 2014 y espacios de participación efectiva, según Ley 1757 de 2015.",
      "Sí - Avanzado":
        "Podria profundizar en la transparencia y trazabilidad de los procesos de identificación de comunidades afectadas, haciendo públicos los criterios y resultados, con validación social y técnica. Conforme al Artículo 7 del Acuerdo de Escazú, esto debe ir acompañado de una participación informada, oportuna y continua, garantizando derechos diferenciales y fortaleciendo la confianza en la gestión ambiental.",
      No: "Defina criterios claros, públicos y participativos para identificar a las personas o comunidades directamente afectadas, conforme al Artículo 5, 6 y 7 del Acuerdo de Escazú. Esto permitirá garantizar la participación desde las primeras etapas del proceso, como lo exige la Ley 1757 de 2015, y asegurar el acceso a información relevante de acuerdo con la Ley 1712 de 2014, promoviendo transparencia y equidad en la gestión ambiental.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 30,
    module_id: 3,
    question_text:
      "30. Proporciono y promuevo procedimientos administrativos y judiciales para que la ciudadanía pueda impugnar o recurrir en decisiones ambientales",
    question_type: "statement" as const,
    order_index: 30,
    recommendations: {
      "Sí - Básico":
        "Adopte mecanismos institucionales que garanticen el acceso a procedimientos administrativos y judiciales efectivos para impugnar decisiones ambientales, en cumplimiento del Artículo 5 del Acuerdo de Escazú. Es fundamental que la ciudadanía conozca y acceda fácilmente a estos recursos, conforme a la Ley 1757 de 2015 y a los principios de transparencia y acceso a la información de la Ley 1712 de 2014.",
      "Sí - Intermedio":
        "Fortalezca y visibilice los procedimientos ya existentes, garantizando que la ciudadanía conozca sus derechos y cómo ejercerlos frente a decisiones ambientales. Se debe avanzar en la eliminación de barreras de acceso (territoriales, digitales o jurídicas) y cumplir con el Acuerdo de Escazú (Art. 8), asegurando una participación activa y justa, conforme a la Ley 1757 y la Ley 1712.",
      "Sí - Avanzado":
        "Consolide las buenas prácticas institucionales, como la promoción activa del acceso a la justicia ambiental, mediante estrategias de divulgación, acompañamiento jurídico y evaluación del impacto de los recursos ejercidos. Esto debe estar articulado con el Artículo 85del Acuerdo de Escazú, promoviendo justicia ambiental efectiva, accesible y equitativa, en línea con las leyes 1712 y 1757.",
      No: "Establezca rutas claras de acción jurídica y administrativa que permitan a la ciudadanía ejercer su derecho a impugnar decisiones ambientales. Esto responde al Acuerdo de Escazú (art. 5) y a lo estipulado en la Ley 1757 de 2015 sobre mecanismos de participación, así como a la obligación de garantizar el acceso efectivo a la información (Ley 1712 de 2014).",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 31,
    module_id: 3,
    question_text:
      "31. Promuevo activamente el ejercicio del derecho al control social sobre la gestión ambiental",
    question_type: "statement" as const,
    order_index: 31,
    recommendations: {
      "Sí - Básico":
        "Implemente mecanismos claros para promover el ejercicio del control social en la gestión ambiental, en línea con los principios de transparencia y participación ciudadana establecidos en la Ley 1712 de 2014 y la Ley 1757 de 2015. Además, debe dar acceso a la información pública y garantizar la participación efectiva de la ciudadanía, tal como lo estipula el Artículo 8 del Acuerdo de Escazú.",
      "Sí - Intermedio":
        "Fortalezca los mecanismos de participación ciudadana para el ejercicio del control social sobre la gestión ambiental, promoviendo un acceso amplio y transparente a la información. Esto debe alinearse con la la Ley 1757 de 2015, y el Artículo 7 del Acuerdo de Escazú, garantizando que las decisiones y acciones ambientales sean sujetas a supervisión y rendición de cuentas por parte de la ciudadanía.",
      "Sí - Avanzado":
        "Expanda las estrategias de control social, promoviendo la participación activa y continua de la ciudadanía en la gestión ambiental, más alla de los procesos de rendición de cuenta, atrevase a implementar otro tipo de modalidades de control social como veedurías ciudadanas, las Juntas de vigilancia, los Comités de Desarrollo y Control Social de los Servicios Públicos Domiciliarios, las auditorías ciudadanas y las instancias de participación ciudadana, revise articulos 63 y 65",
      No: "Elaboré e implemente un plan específico para fomentar el control social activo en la gestión ambiental, creando espacios formales de participación donde la ciudadanía pueda monitorear y evaluar las decisiones ambientales. Además, debe garantizar que la información relevante sea proporcionada de manera accesible y en formatos comprensibles para facilitar la participación, revise Título V capítulo 1 Del control social a lo público de la Ley 1757.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 32,
    module_id: 3,
    question_text:
      "32. Tengo un canal formal exclusivo para recibir y atender solicitudes de información pública relacionadas con el control social ambiental",
    question_type: "statement" as const,
    order_index: 32,
    recommendations: {
      "Sí - Básico":
        "Fortalezca el canal existente haciéndolo más visible y accesible, utilizando formatos comprensibles para todos los grupos (Art. 8 Ley 1712 de 2014), alineándolo con el Acuerdo de Escazú (Arts. 5 y 6) para garantizar inclusión y participación efectiva. Además, es clave establecer protocolos claros de atención y respuesta oportuna, promoviendo así un ejercicio más robusto del control social ambiental.",
      "Sí - Intermedio":
        "Mejore el canal formal garantizando su visibilidad y accesibilidad (Art. 8 Ley 1712 de 2014), facilitando el ejercicio efectivo del control social ambiental. Debe alinearse con el Acuerdo de Escazú, asegurando información oportuna y comprensible. Es clave incluir mecanismos de retroalimentación ciudadana. Así se fortalece la participación y transparencia en la gestión ambiental.",
      "Sí - Avanzado":
        "Consolide el canal formal de participación, garantizando su alineación con los principios de la Ley 1757 de 2015 sobre participación efectiva y acceso a la información. Este canal debe integrarse con los sistemas de gestión documental y cumplir con los criterios de accesibilidad establecidos en la Ley 1712 de 2014, así como los principios del Acuerdo de Escazú. Además, se sugiere implementar plataformas tecnológicas para el seguimiento de solicitudes y generar retroalimentación continua, optimizando el control social ambiental y asegurando la transparencia y eficiencia del proceso.",
      No: "Establezca un canal formal de participación que permita a la ciudadanía acceder a la información y expresar sus opiniones sobre la gestión ambiental, en cumplimiento con el Art. 8 de la Ley 1712 de 2014 y el Acuerdo de Escazú. Este canal debe garantizar la accesibilidad y estar alineado con los principios de participación activa y transparencia establecidos en la Ley 1757 de 2015. Además, se debe asegurar un seguimiento adecuado y la implementación de formatos accesibles para grupos vulnerables. Esto iniciará el fortalecimiento del control social ambiental.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 33,
    module_id: 3,
    question_text:
      "33. Diseñamos y ejecutamos la audiencia de rendición de cuentas de nuestra entidad con el objetivo de que ciudadanía de nuestro territorio evalúe nuestra gestión ambiental y los resultados de la toma de decisiones ambientales",
    question_type: "statement" as const,
    order_index: 33,
    recommendations: {
      "Sí - Básico":
        "Establezca un proceso formal de rendición de cuentas donde la ciudadanía pueda evaluar la gestión ambiental de la entidad, siguiendo lo establecido en la Ley 1712 de 2014 y los principios de participación de la Ley 1757 de 2015. La audiencia debe garantizar que la información presentada sea clara, accesible y comprensible para todos los ciudadanos. Además, se sugiere ofrecer espacios para que la comunidad pueda hacer preguntas y recibir respuestas de manera efectiva.",
      "Sí - Intermedio":
        "Formalice y estructure un proceso de rendición de cuentas que permita a la ciudadanía evaluar la gestión ambiental, en línea con los principios de transparencia y participación activa establecidos en la Ley 1757 de 2015 y la Ley 1712 de 2014. La audiencia debe ser inclusiva, garantizando accesibilidad y formatos comprensibles para todos los grupos, especialmente los vulnerables, tal como lo exige el Acuerdo de Escazú. Asimismo, se debe incluir un mecanismo de retroalimentación que permita la mejora continua en la toma de decisiones ambientales.",
      "Sí - Avanzado":
        "Fortalezca el proceso de rendición de cuentas alineado con los principios de transparencia, participación activa y acceso a la información de la Ley 1757 de 2015, la Ley 1712 de 2014 y el Acuerdo de Escazú. Este proceso debe integrar tecnologías accesibles para facilitar la participación ciudadana y garantizar la accesibilidad de la información. Además, se sugiere iniciar la implementación gradual de herramientas básicas de análisis de datos para evaluar la retroalimentación recibida y mejorar la toma de decisiones ambientales, adaptándose a los recursos disponibles.",
      No: "Diseñe e implemente un proceso formal de rendición de cuentas en el que la ciudadanía pueda evaluar la gestión ambiental de la entidad, de acuerdo con lo dispuesto en el Art. 8 de la Ley 1712 de 2014 y los principios de transparencia y participación activa establecidos en la Ley 1757 de 2015. Este proceso debe garantizar que la información presentada sea clara, accesible y comprensible, especialmente para grupos vulnerables, y debe alinearse con los lineamientos del Acuerdo de Escazú. Establecer un sistema de retroalimentación ayudará a fortalecer la confianza y mejorar la toma de decisiones ambientales.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 34,
    module_id: 3,
    question_text:
      "34. En nuestra entidad se ha usado la información de la evaluación ciudadana de la rendición de cuentas para la mejora de nuestra gestión ambiental",
    question_type: "statement" as const,
    order_index: 34,
    recommendations: {
      "Sí - Básico":
        "Utilice la información obtenida de la evaluación ciudadana en el proceso de rendición de cuentas para identificar áreas de mejora en la gestión ambiental. Es importante estructurar un sistema sencillo que permita recopilar y organizar los comentarios y sugerencias de la ciudadanía. Esta retroalimentación debe ser tomada en cuenta para ajustar de manera progresiva las políticas y acciones ambientales de la entidad.",
      "Sí - Intermedio":
        "Formalice el proceso de retroalimentación ciudadana tras la rendición de cuentas, utilizando la información obtenida para realizar ajustes estratégicos en la gestión ambiental. Se sugiere establecer mecanismos claros para incorporar las sugerencias y críticas en la planificación y ejecución de proyectos ambientales, mejorando la transparencia y eficiencia. Esto debe ser acompañado de un seguimiento para asegurar que las acciones de mejora sean implementadas efectivamente.",
      "Sí - Avanzado":
        "Integre un sistema formal y sistemático para el uso de la información obtenida de la evaluación ciudadana en la rendición de cuentas, asegurando que esta retroalimentación se utilice para la mejora continua de la gestión ambiental. La entidad debe implementar herramientas tecnológicas para analizar la información y priorizar áreas de mejora, ajustando las políticas y estrategias ambientales de manera ágil. Además, se debe garantizar la transparencia en cómo se incorporan estas sugerencias y se comunican los cambios realizados a la ciudadanía.",
      No: "Implemente de inmediato un mecanismo para recoger y utilizar la retroalimentación ciudadana proveniente de la rendición de cuentas. La falta de este proceso limita la capacidad de la entidad para responder de manera efectiva a las preocupaciones y sugerencias de la ciudadanía, lo que afecta la transparencia y la legitimidad de las decisiones ambientales. Utilizar esta información para ajustar las políticas y acciones ambientales fortalecerá el compromiso con la gestión pública y la participación de la comunidad.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  {
    id: 35,
    module_id: 3,
    question_text:
      "35. En nuestra entidad se diseñan diálogos de rendición de cuentas para la toma de decisiones ambientales",
    question_type: "statement" as const,
    order_index: 35,
    recommendations: {
      "Sí - Básico":
        "Fortalezca los diálogos de rendición de cuentas alineados con la Ley 1712 de 2014 y el Acuerdo de Escazú, asegurando que sean más accesibles y utilizados para ajustar las decisiones ambientales. Además, debe garantizar la participación ciudadana conforme al artículo 8 de la Ley 1757 de 2015, promoviendo la transparencia y el acceso a la información.",
      "Sí - Intermedio":
        "Fortalezca los diálogos de rendición de cuentas, garantizando su accesibilidad y alineándolos con la Ley 1712 de 2014 y el Acuerdo de Escazú, para asegurar una participación ciudadana efectiva. Asimismo, debe asegurarse de que los resultados de estos diálogos se utilicen en la toma de decisiones ambientales, conforme al artículo 8 de la Ley 1757 de 2015, promoviendo una gestión más transparente y responsable.",
      "Sí - Avanzado":
        "Optimice los diálogos de rendición de cuentas, alineándolos de manera integral con la Ley 1712 de 2014, el Acuerdo de Escazú y la Ley 1757 de 2015, asegurando que no solo se dé acceso a la información, sino que los resultados sean utilizados para ajustar políticas ambientales. Además, debe aplicar herramientas tecnológicas avanzadas que permitan la inclusión de diversas poblaciones y proporcionar espacios de retroalimentación continua para mejorar la toma de decisiones.",
      No: "Debe iniciar el diseño de los diálogos de rendición de cuentas, asegurando su alineación con la Ley 1712 de 2014, el Acuerdo de Escazú y la Ley 1757 de 2015. Estos diálogos deben ser estructurados de manera accesible, utilizando tecnologías inclusivas y garantizando que los resultados se utilicen para ajustar las decisiones ambientales. Es esencial establecer un proceso continuo de participación ciudadana para mejorar la transparencia y la toma de decisiones.",
      "No aplica":
        "Revise en la normatividad vigente si en realidad esto no le aplica a su entidad y en la siguiente casilla justifique su elección con base en el criterio jurídico de su entidad.",
    },
  },
  // Preguntas adicionales 36 y 37
  {
    id: 36,
    module_id: 3,
    question_text:
      "36. Describa las principales fortalezas de su entidad en materia de transparencia, participación y evaluación ambiental",
    question_type: "open" as const,
    order_index: 36,
    recommendations: {
      general:
        "Sistematice y documente las fortalezas identificadas como buenas prácticas institucionales. Utilice esta información para fortalecer los procesos existentes y compartir experiencias con otras entidades del territorio.",
    },
  },
  {
    id: 37,
    module_id: 3,
    question_text:
      "37. Identifique los principales retos y oportunidades de mejora en la implementación de los derechos de acceso en asuntos ambientales",
    question_type: "open" as const,
    order_index: 37,
    recommendations: {
      general:
        "Elabore un plan de mejoramiento institucional basado en los retos identificados, estableciendo metas, responsables y cronogramas específicos para avanzar en la implementación efectiva de los derechos de acceso en asuntos ambientales.",
    },
  },
];
