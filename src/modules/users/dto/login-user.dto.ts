// LoginUserDto 클래스는 사용자 로그인 요청을 위한 데이터 전송 객체(Data Transfer Object)입니다.
export class LoginUserDto {
  // 사용자의 이메일 주소입니다.
  // 이메일은 로그인 식별자로 사용되며, 유효한 형식의 이메일 주소여야 합니다.
  email: string;

  // 사용자의 비밀번호입니다.
  // 비밀번호는 로그인 과정에서 사용자의 이메일과 함께 전송되어, 사용자 인증에 사용됩니다.
  password: string;
}
