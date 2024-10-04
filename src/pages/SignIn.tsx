import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import styled from "styled-components";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Toast, HappyEmoji, WorriedEmoji, CryingEmoji } from "shareduck-ui";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  autoLogin: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      autoLogin: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    // 로그인 처리 로직
  });

  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <h1>로그인</h1>
        <p>이메일과 비밀번호를 입력해주세요!</p>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <StyledInput
                {...field}
                type="email"
                placeholder="이메일"
                onChange={(checkEmail) => {
                  field.onChange(checkEmail);
                  trigger("email");
                }}
              />
              {field.value && errors.email ? (
                <StyledToast variants="error">
                  <StyledToast.Emoji src={CryingEmoji} alt="이메일 오류" />
                  <StyledToast.Text content="이메일 형식이 올바르지 않습니다." />
                </StyledToast>
              ) : field.value && !errors.email ? (
                <StyledToast variants="pass">
                  <StyledToast.Emoji src={HappyEmoji} alt="이메일 유효" />
                  <StyledToast.Text content="사용 가능한 이메일입니다." />
                </StyledToast>
              ) : null}
            </>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <StyledInput
              {...field}
              type="password"
              placeholder="비밀번호"
              isError={!!errors.password}
            />
          )}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <StyledCheckbox>
          <input type="checkbox" name="autoLogin" />
          <label>자동 로그인</label>
        </StyledCheckbox>

        <StyledButton type="submit">로그인</StyledButton>
        <StyledLoginLink>비밀번호 재설정</StyledLoginLink>

        <Divider>or continue with</Divider>

        <StyledGoogleButton>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
          />
          Google
        </StyledGoogleButton>
        <StyledNotice>
          구글 로그인 시 개인정보이용과 서비스이용 약관에 동의합니다.
        </StyledNotice>
      </StyledForm>
    </Container>
  );
};

// 중앙 정렬을 위한 Container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

// Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;

  h1 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    color: #666;
  }
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => (props.isError ? "red" : "#ccc")};
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.85em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &::before {
    content: "⚠️";
    margin-right: 5px;
  }
`;

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }

  label {
    font-size: 0.9em;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #6a1b9a;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4a148c;
  }
`;

const StyledLoginLink = styled.div`
  margin-top: 10px;
  color: #6a1b9a;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 0.9em;
  color: #666;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const StyledGoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
  color: #444;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;

  img {
    width: 20px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledNotice = styled.div`
  margin-top: 10px;
  font-size: 0.8em;
  color: #666;
  text-align: center;
`;
const StyledToast = styled(Toast)`
  margin-bottom: 15px;
  margin-top: -5px;
`;
export default SignIn;
