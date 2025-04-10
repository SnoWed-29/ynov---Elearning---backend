// src/models/associations.js
const User = require('./User');
const Niveau = require('./Niveau');
const NiveauxSpecialite = require('./NiveauxSpecialite');
const Specialite = require('./Specialite');
const SpecialModule = require('./SpeciaModule');
const Module = require('./Module');
const UserModule = require('./UserModule');
const Chapter = require('./Chapter');
const Materials = require('./Material');
const Video = require('./Video');
const Quiz = require('./Quiz');
const Certificate = require('./Certificate');
const Chat = require('./Chat');
const Messages = require('./Message');
const UserChat = require('./UserChat');
const QuizQuestion = require('./QuizQuestions');
const UserQuiz = require('./UserQuiz');

// Define Associations (Relationships)
User.belongsTo(Niveau, { foreignKey: 'niveau_id', as: 'niveau' });
Niveau.hasMany(User, { foreignKey: 'niveau_id', as: 'users' });

Niveau.belongsToMany(Specialite, { through: NiveauxSpecialite, as: 'specialites', foreignKey: 'niveauId' });
Specialite.belongsToMany(Niveau, { through: NiveauxSpecialite, as: 'niveaux', foreignKey: 'specialiteId' });

Specialite.belongsToMany(Module, { through: SpecialModule, as: 'modules', foreignKey: 'specialiteId' });
Module.belongsToMany(Specialite, { through: SpecialModule, as: 'specialites', foreignKey: 'moduleId' });

User.belongsToMany(Module, {
  through: UserModule,
  as: 'modules',
  foreignKey: 'userId', // Explicitly define foreign key for User
  otherKey: 'moduleId' // Explicitly define foreign key for Module
});
Module.belongsToMany(User, {
  through: UserModule,
  as: 'users',
  foreignKey: 'moduleId', // Explicitly define foreign key for Module
  otherKey: 'userId' // Explicitly define foreign key for User
});

Module.hasMany(Chapter, { foreignKey: 'moduleId', as: 'chapters' });
Chapter.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

Chapter.hasMany(Materials, { foreignKey: 'chapterId', as: 'materials' });
Materials.belongsTo(Chapter, { foreignKey: 'chapterId', as: 'chapter' });

Chapter.hasMany(Video, { foreignKey: 'chapterId', as: 'videos' });
Video.belongsTo(Chapter, { foreignKey: 'chapterId', as: 'chapter' });

Module.hasOne(Quiz, { foreignKey: 'moduleId', as: 'quiz' }); // Assuming one quiz per module
Quiz.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

// Quiz and QuizQuestion association
Quiz.hasMany(QuizQuestion, { foreignKey: 'quizId', as: 'questions' });
QuizQuestion.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

// User and Quiz association through UserQuiz
User.belongsToMany(Quiz, {
  through: UserQuiz,
  as: 'quizzes',
  foreignKey: 'userId', // Explicitly define foreign key for User
  otherKey: 'quizId'   // Explicitly define foreign key for Quiz
});
Quiz.belongsToMany(User, {
  through: UserQuiz,
  as: 'users',
  foreignKey: 'quizId',   // Explicitly define foreign key for Quiz
  otherKey: 'userId'    // Explicitly define foreign key for User
});

User.hasMany(UserQuiz, { foreignKey: 'userId', as: 'userQuizzes' });
Quiz.hasMany(UserQuiz, { foreignKey: 'quizId', as: 'quizQuizzes' });

UserQuiz.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserQuiz.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

User.hasMany(Certificate, { foreignKey: 'userId', as: 'certificates' });
Certificate.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Module.hasMany(Certificate, { foreignKey: 'moduleId', as: 'certificates' });
Certificate.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

User.belongsToMany(Chat, {
  through: UserChat,
  as: 'chats',
  foreignKey: 'userId', // Explicitly define foreign key for User
  otherKey: 'chatId'   // Explicitly define foreign key for Chat
});
Chat.belongsToMany(User, {
  through: UserChat,
  as: 'users',
  foreignKey: 'chatId',   // Explicitly define foreign key for Chat
  otherKey: 'userId'    // Explicitly define foreign key for User
});

Chat.hasMany(Messages, { foreignKey: 'chatId', as: 'messages' });
Messages.belongsTo(Chat, { foreignKey: 'chatId', as: 'chat' });
User.hasMany(Messages, { foreignKey: 'userId', as: 'messages' });
Messages.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = () => {};