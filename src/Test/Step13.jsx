import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  width: 80vw;
  /* 수직 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 10px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바 색상 */
    border-radius: 5px; /* 스크롤바 모서리 둥글게 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 스크롤바 호버 시 색상 변경 */
  }
`;
const Content = styled.div`
  display: flex;
  padding: 15px;
  height: 50vh;
  width: 90%;
  margin: 0 auto;
  background: #fafafa;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 225% */
  overflow: scroll;
`;
const Text1 = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 600;
  margin: 20px;
  margin-left: 40px;
`;

const Step13 = () => {
  const [inputFields, setInputFields] = useState([]);
  const [originalText, setOriginalText] = useState("");
  //GET
  const sendGetRequest = async () => {
    try {
      const apiUrl = "http://localhost:8080/workbook/get/19";

      // 헤더 설정
      const headers = {
        "Content-Type": "application/json",
        "member-id": 2,
      };

      //GET 요청 보내기
      const response = await axios.get(apiUrl, { headers });

      console.log("문제집 GET 응답 데이터:", response.data);
      console.log(
        "문제집 GET 응답 데이터2:",
        response.data.result.text.content
      );
      setOriginalText(response.data.result.text.content);
      /*  setWorkbook(response.data.result.getResults); */
    } catch (error) {
      console.error("오류 발생:", error.message);
    }
  };
  useEffect(() => {
    sendGetRequest();
  }, []);
  useEffect(() => {
    // 서버에서 동적으로 생성된 빈칸의 수와 원본 텍스트를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        // 서버에서 데이터를 가져오는 로직을 구현
        // 예: const response = await fetch('/api/getBlankCountAndText');
        // const data = await response.json();

        // 여기에서 서버에서 받은 데이터로 빈칸에 대한 입력 필드와 원본 텍스트를 설정
        /* const data = {
          blankCount: 3, // 임시 데이터 (실제로는 서버에서 받아야 함)
          originalText:
            "운영체제(operating system, 약칭: OS)은 사용자의 하드웨어, 시스템 리소스를 제어하고 <blank1> 대한 일반적 서비스를 지원하는 시스템 소프트웨어이다. 시스템 하드웨어를 관리할 뿐 아니라 응용 소프트웨어를 실행하기 위하여 하드웨어 추상화 플랫폼과 공통 시스템 <blank2>를 제공한다. 최근에는 가상화 기술의 발전에 힘입어 실제 하드웨어가 아닌 하이퍼바이저(가상 머신) 위에서 실<blank3> 한다.",
        };
 */
        /*  setOriginalText(data.originalText);
         */
        const newInputFields = Array.from({ length: 3 }, (_, index) => ({
          id: index + 1,
          value: "",
        }));

        setInputFields(newInputFields);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (id, value) => {
    setInputFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const renderTextWithInputs = () => {
    let result = originalText;
    inputFields.forEach((field) => {
      result = result.replace(
        `<blank${field.id}>`,
        `<input type="text" value="${field.value}" />`
      );
    });
    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <Wrap>
      <Text1>생성된 요약본입니다!</Text1>
      <Content>
        데이터베이스는 정보를 구조화하여 저장하고 관리하는 시스템으로, 컴퓨터
        시스템에서 여러 사용자가 동시에 접근할 수 있도록 설계됩니다. 이는
        데이터를 효율적으로 저장하고 조작할 수 있는 기능을 제공하며, 관계형과
        NoSQL 데이터베이스 등 다양한 유형이 있습니다. 데이터베이스는 기업 업무,
        인터넷 서비스, 은행 시스템, 학교 관리 등 다양한 분야에서 활용됩니다.
      </Content>
    </Wrap>
  );
};

export default Step13;