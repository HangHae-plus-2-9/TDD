export const toSeconds = (input: string) => {
  // 단위를 초로 변환하기 위한 객체
  // Object to convert units to seconds
  const units = {
    s: 1, // 초(seconds)
    m: 60, // 분(minutes)
    h: 60 * 60, // 시(hours)
    d: 60 * 60 * 24, // 일(days)
    w: 60 * 60 * 24 * 7, // 주(weeks)
  };

  // 입력 문자열에서 숫자와 시간 단위를 추출하기 위한 정규식 사용
  // Using a regex to extract the number and time unit from the input string
  const match = input.match(/(\d+)([smhdw])/);

  // 일치하는 항목이 없을 경우 오류 발생
  // Throw an error if no matching items found
  if (!match) {
    throw new Error('Invalid input format');
  }

  // 추출된 숫자 값을 정수로 변환
  // Convert the extracted number value to integer
  const value = parseInt(match[1], 10);

  // 추출된 시간 단위 값을 가져오기
  // Get the extracted time unit value
  const unit = match[2];

  // 시간 단위 값을 초로 변환한 후, 값과 곱하여 반환
  // Convert the time unit value to seconds and multiply by the value, then return
  return value * (units[unit] || 0);
};
