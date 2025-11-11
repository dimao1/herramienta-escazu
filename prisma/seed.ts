import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  // 1. Crear admin
  console.log('👤 Creando usuario administrador...');
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: 'admin123', // En producción, usar bcrypt
    },
  });
  console.log('✅ Admin creado:', admin.username);

  // 2. Crear opciones de respuesta
  console.log('\n📋 Creando opciones de respuesta...');
  const responseOptions = await Promise.all([
    prisma.responseOption.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, optionText: 'Sí - Básico', points: 1, excludesFromCalculation: false },
    }),
    prisma.responseOption.upsert({
      where: { id: 2 },
      update: {},
      create: { id: 2, optionText: 'Sí - Avanzado', points: 2, excludesFromCalculation: false },
    }),
    prisma.responseOption.upsert({
      where: { id: 3 },
      update: {},
      create: { id: 3, optionText: 'No', points: 0, excludesFromCalculation: false },
    }),
    prisma.responseOption.upsert({
      where: { id: 4 },
      update: {},
      create: { id: 4, optionText: 'No Aplica', points: 0, excludesFromCalculation: true },
    }),
    prisma.responseOption.upsert({
      where: { id: 5 },
      update: {},
      create: { id: 5, optionText: 'Desconoce', points: 0, excludesFromCalculation: true },
    }),
  ]);
  console.log(`✅ ${responseOptions.length} opciones creadas`);

  // 3. Crear módulos
  console.log('\n📚 Creando módulos...');
  const modules = await Promise.all([
    prisma.module.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'Módulo 1: Transparencia y Acceso a la Información Ambiental',
        description: 'Evaluación de transparencia y acceso a información',
        orderIndex: 1,
      },
    }),
    prisma.module.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: 'Módulo 2: Divulgación y publicación de información ambiental',
        description: 'Evaluación de divulgación y publicación de información ambiental',
        orderIndex: 2,
      },
    }),
    prisma.module.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        name: 'Módulo 3: Participación ciudadana en la toma de decisiones ambientales',
        description: 'Evaluación de participación en decisiones',
        orderIndex: 3,
      },
    }),
  ]);
  console.log(`✅ ${modules.length} módulos creados`);

  // 4. Crear preguntas del Módulo 1
  console.log('\n❓ Creando preguntas del Módulo 1...');
  const mod1Questions = [
    {
      id: 1,
      moduleId: 1,
      questionText: '¿Su municipio cuenta con una política, procedimiento o lineamiento para garantizar el acceso a la información ambiental?',
      questionType: 'single',
      orderIndex: 1,
      recommendations: { basic: 'Desarrollar una política escrita', advanced: 'Implementar sistema digital de consultas' },
    },
    {
      id: 2,
      moduleId: 1,
      questionText: '¿Existe un procedimiento claro y específico para que las personas puedan solicitar información ambiental?',
      questionType: 'single',
      orderIndex: 2,
      recommendations: { basic: 'Crear procedimiento formal', advanced: 'Automatizar el proceso' },
    },
    {
      id: 3,
      moduleId: 1,
      questionText: '¿El municipio tiene un registro o sistema para monitorear las solicitudes de información ambiental recibidas?',
      questionType: 'single',
      orderIndex: 3,
      recommendations: { basic: 'Implementar registro básico', advanced: 'Sistema digital de seguimiento' },
    },
    {
      id: 4,
      moduleId: 1,
      questionText: '¿Se respetan los plazos legales establecidos para responder solicitudes de información ambiental?',
      questionType: 'single',
      orderIndex: 4,
      recommendations: { basic: 'Establecer alertas de vencimiento', advanced: 'Sistema automatizado de plazos' },
    },
    {
      id: 5,
      moduleId: 1,
      questionText: '¿Existe un mecanismo para que las personas apelen o presenten quejas si se les niega el acceso a información ambiental?',
      questionType: 'single',
      orderIndex: 5,
      recommendations: { basic: 'Crear mecanismo de apelación', advanced: 'Portal de quejas en línea' },
    },
  ];

  for (const q of mod1Questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: q,
    });
  }
  console.log(`✅ ${mod1Questions.length} preguntas del Módulo 1 creadas`);

  // 5. Crear preguntas del Módulo 2
  console.log('\n❓ Creando preguntas del Módulo 2...');
  const mod2Questions = [
    {
      id: 6,
      moduleId: 2,
      questionText: '¿El municipio cuenta con un sitio web o plataforma digital donde publica información ambiental?',
      questionType: 'single',
      orderIndex: 1,
      recommendations: { basic: 'Crear sección ambiental en sitio web', advanced: 'Portal ambiental interactivo' },
    },
    {
      id: 7,
      moduleId: 2,
      questionText: '¿Se publican informes periódicos sobre el estado del medio ambiente en el municipio?',
      questionType: 'single',
      orderIndex: 2,
      recommendations: { basic: 'Publicar informe anual', advanced: 'Reportes trimestrales digitales' },
    },
    {
      id: 8,
      moduleId: 2,
      questionText: '¿Se divulgan los resultados de las evaluaciones de impacto ambiental realizadas en el municipio?',
      questionType: 'single',
      orderIndex: 3,
      recommendations: { basic: 'Publicar resúmenes ejecutivos', advanced: 'Base de datos pública de EIAs' },
    },
    {
      id: 9,
      moduleId: 2,
      questionText: '¿El municipio publica datos sobre calidad del aire, agua y otros indicadores ambientales?',
      questionType: 'single',
      orderIndex: 4,
      recommendations: { basic: 'Reportes básicos de monitoreo', advanced: 'Dashboard en tiempo real' },
    },
    {
      id: 10,
      moduleId: 2,
      questionText: '¿Se utiliza un lenguaje accesible y comprensible en la información ambiental publicada?',
      questionType: 'single',
      orderIndex: 5,
      recommendations: { basic: 'Revisar comunicaciones', advanced: 'Infografías y contenido multimedia' },
    },
  ];

  for (const q of mod2Questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: q,
    });
  }
  console.log(`✅ ${mod2Questions.length} preguntas del Módulo 2 creadas`);

  // 6. Crear preguntas del Módulo 3
  console.log('\n❓ Creando preguntas del Módulo 3...');
  const mod3Questions = [
    {
      id: 11,
      moduleId: 3,
      questionText: '¿Existen mecanismos formales para la participación ciudadana en decisiones ambientales del municipio?',
      questionType: 'single',
      orderIndex: 1,
      recommendations: { basic: 'Crear comité ambiental', advanced: 'Plataforma digital de participación' },
    },
    {
      id: 12,
      moduleId: 3,
      questionText: '¿Se realizan consultas públicas sobre proyectos o políticas ambientales?',
      questionType: 'single',
      orderIndex: 2,
      recommendations: { basic: 'Implementar consultas básicas', advanced: 'Sistema de consulta digital' },
    },
    {
      id: 13,
      moduleId: 3,
      questionText: '¿Las comunidades afectadas participan en las evaluaciones de impacto ambiental?',
      questionType: 'single',
      orderIndex: 3,
      recommendations: { basic: 'Incluir reuniones comunitarias', advanced: 'Proceso participativo formal' },
    },
    {
      id: 14,
      moduleId: 3,
      questionText: '¿Existe un registro público de las observaciones ciudadanas sobre asuntos ambientales?',
      questionType: 'single',
      orderIndex: 4,
      recommendations: { basic: 'Crear registro básico', advanced: 'Portal público de observaciones' },
    },
    {
      id: 15,
      moduleId: 3,
      questionText: '¿Se informa a la ciudadanía sobre cómo sus comentarios fueron considerados en las decisiones finales?',
      questionType: 'single',
      orderIndex: 5,
      recommendations: { basic: 'Publicar respuestas', advanced: 'Sistema de retroalimentación' },
    },
  ];

  for (const q of mod3Questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: q,
    });
  }
  console.log(`✅ ${mod3Questions.length} preguntas del Módulo 3 creadas`);

  console.log('\n🎉 ¡Seed completado exitosamente!');
  console.log('\n📊 Resumen:');
  console.log(`   - Módulos: ${modules.length}`);
  console.log(`   - Preguntas: ${mod1Questions.length + mod2Questions.length + mod3Questions.length}`);
  console.log(`   - Opciones: ${responseOptions.length}`);
  console.log(`   - Admin: 1 (usuario: admin, password: admin123)`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
