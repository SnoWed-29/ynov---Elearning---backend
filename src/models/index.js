
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

// Import and run the associations
require('./associations');

module.exports = {
QuizQuestion,
  User,
  Niveau,
  NiveauxSpecialite,
  Specialite,
  SpecialModule,
  Module,
  UserModule,
  Chapter,
  Materials,
  Video,
  Quiz,
  Certificate,
  Chat,
  Messages,
  UserChat,
};