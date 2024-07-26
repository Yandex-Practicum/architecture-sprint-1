import mongoose, { Model, Document, HydratedDocument } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'; // импортируем bcrypt
import { urlRegExp } from '../middlewares/validatons';
import UnauthorizedError from '../errors/unauthorized-error';

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserMethods {
  toJSON(): string;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findUserByCredentials: (email: string, password: string) =>
                             Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      // для проверки ссылок студентам необходимо написать регулярное выражение
      validator: (v: string) => urlRegExp.test(v),
      message: 'Поле "avatar" должно быть валидным url-адресом.',
    },
  },
  // в схеме пользователя есть обязательные email и password
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true, // поле email уникально (есть опция unique: true);
    validate: {
      // для проверки email студенты используют validator
      validator: (v: string) => validator.isEmail(v),
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  // поле password не имеет ограничения на длину, т.к. пароль хранится в виде хэша
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics
  .findUserByCredentials = function findByCredentials(email: string, password: string) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
            }
            return user;
          });
      });
  };

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUser, IUserModel>('user', userSchema);
