import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  firstName: string;

  @Rule(RuleType.string().max(10))
  lastName: string;

  @Rule(RuleType.number().max(60))
  age: number;
}

export class CheckRegisterDTO {
  @ApiProperty({
    example: 'peter@gmail.com',
    description: '用户邮箱',
  })
  @Rule(RuleType.string().email().required().max(30).min(6))
  email: string;
}

export class LoginDTO {
  @ApiProperty({
    example: 'peter@gmail.com',
  })
  @Rule(RuleType.string().email().required().max(30).min(6))
  email: string;

  @ApiProperty({
    example: '张三',
  })
  @Rule(RuleType.string().required().max(20).min(2))
  nickname: string;

  @ApiProperty({
    example: '123123',
    description: '账户密码',
  })
  @Rule(RuleType.string().required().max(16).min(6))
  password: string;

  @ApiProperty({
    example: 'abcd',
    description: '四位验证码',
    examples: ['123', '1231s'],
  })
  @Rule(RuleType.string().length(4))
  code: string;

  @ApiProperty({
    example: false,
    description: '是否为注册场景（登录时使用未注册过的的邮箱）',
  })
  @Rule(RuleType.boolean())
  register: boolean;
}
