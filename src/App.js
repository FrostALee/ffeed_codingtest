import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";

import Close from "./Image/x-circle-fill.svg"
import Camera from "./Image/camera-fill.svg"
import BackButton from "./Image/arrow-left.svg"



function App() {

  const [ImgUpload, setImgUpload] = useState("");
  const [TextState, setTextState] = useState(0);
  const [InNumber, setNumber] = useState("");

  const [ProductError, setProductError] = useState({text: ""});
  const [ImgError, setImgError] = useState({photostate: ""});
  const [CostError, setCostError] = useState({cost: ""});

  const ProductRef = useRef();
  const CostRef = useRef();


  const HandleChange = (e) => {
    setTextState(e.target.value)
  }

  const onChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgUpload(reader.result);
        resolve();
      };
    });
  };


  const InputCost = (cost) => {  
      const comma = (cost) => {
        cost = String(cost);
        return cost.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
      };
      const uncomma = (cost) => {
        cost = String(cost);
        return cost.replace(/[^\d]+/g, "");
      };
      return comma(uncomma(cost) + ' \ ' + "원");
  };


  const ChkContent = () => {
    if (TextState === 0){
      setProductError({
        text: "제품 설명 내용을 작성해주세요."
      })
      ProductRef.current.focus()
    }else if(TextState.length < 10){
      setProductError({
        text: "최소 10자 이상 입력해주세요."
      })
      ProductRef.current.focus()
    }else{
      setProductError({
        text: ""
      })
    }
    if (ImgUpload.length === 0){
      setImgError({
        photostate: "제품 사진을 최소 1장 이상 첨부해주세요."
      })
    }else{
      setImgError({
        photostate: ""
      })
    }
    if (InNumber < 300){
      setCostError({
        cost: "최소 300원 이상 입력해주세요."
      })
      CostRef.current.focus()
    }else{
      setCostError({
        cost: ""
      })
    }
  }

  useEffect(() => {

  })


  return (

    <AllWrap>

      <HeaderWrap>
        <LeftArrowDiv></LeftArrowDiv>
        <HeaderSpan>판매하기</HeaderSpan>
        <RightArrowDiv></RightArrowDiv>
      </HeaderWrap>

      <BodyWrap>
        <ProductSubWrap>
          <ProductTopWrap>
            <TitleSpan>제품 설명</TitleSpan>
            <ProductLimit>{TextState === 0 ? 0 : TextState?.length}/20</ProductLimit>
          </ProductTopWrap>
          <ProductInput 
            placeholder="제품 설명을 입력해주세요."
            spellCheck={false}
            onChange={HandleChange}
            maxLength='20'
            ref={ProductRef}
          />
          <WarningWrap>
            {/* <span style={{display: TextState < 10 ? "none" : ""}}>제품 설명 내용을 최소 10자 이상 작성해주세요</span> */}
            <span>{ProductError.text}</span>
          </WarningWrap>
        </ProductSubWrap>

        <ImageWrap>
          <ImageTopWrap>
            <TitleSpan>구매 증빙 자료</TitleSpan>
          </ImageTopWrap>
          <ImageAddWrap>
            {ImgUpload ? (
              <>
                <ImageAdd>
                  <UploadImgContainner src={Camera}/>
                  <PhotoSpan>사진 첨부</PhotoSpan>
                  <input type="file" style={{display:"none"}} accept="image/*" onChange={onChange}/>
                </ImageAdd>
                <ImageCloseIcon src={Close} onClick={() => {setImgUpload("")}}/>
                <ImageResult style={{backgroundImage:`url(${ImgUpload})`}}/>
              </>
             ) : (
              <>
                <ImageAdd>
                  <UploadImgContainner src={Camera}/>
                  <PhotoSpan>사진 첨부</PhotoSpan>
                  <input type="file" style={{display:"none"}} accept="image/*" onChange={onChange}/>
                </ImageAdd>
              </>
             )}
          </ImageAddWrap>
          <WarningWrap>
            <span>{ImgError.photostate}</span>
          </WarningWrap>
        </ImageWrap>


        <CostWrap>
          <div>
            <TitleSpan>판매가</TitleSpan>
          </div>
          <CostInputWrap>
            <CostInput 
              placeholder="판매가를 입력해주세요."
              type="text"
              value={InNumber}
              onChange={(e) => {setNumber(InputCost(e.target.value))}}
              ref={CostRef}
            />
          </CostInputWrap>
          <WarningWrap>
            <span>{CostError.cost}</span>
          </WarningWrap>              
        </CostWrap>
      </BodyWrap>
      
      <SubmitBtn onClick={() => {ChkContent()}}>판매글 올리기</SubmitBtn>

    </AllWrap>

  );
}

const AllWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: auto;
  gap: 35px;
  box-sizing: border-box;
  margin: 30px;
  border-radius: 20px;

  border: 1px solid black;
`

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 35px;
  margin-top: 30px;
`

const BodyWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  display: flex;
  flex-flow: column nowrap;
  gap: 35px;

  /* border: 1px solid black; */

`

const ProductSubWrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 30px;

  /* border: 1px solid black; */
`

const ProductTopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 10px;
`

const ImageWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
`

const ImageTopWrap = styled.div`

`

const PhotoSpan = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const TitleSpan = styled.span`
  font-size: 22px;
  font-weight: 700;
`

const CostWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;

  /* border: 1px solid black; */
`

const HeaderSpan = styled.span`
  font-size: 30px;
  font-weight: 700;
`

const ProductLimit = styled.span`

`

const ProductInput = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 15px;
  outline: none;
  resize: none;
`

const ImageAddWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  height: 200px;
  width: 100%;
  /* border: 1px solid black; */
`

const ImageAdd = styled.label`
  width: 200px;
  height: 200px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ghostwhite;
  border: 1px solid gray;
`

const ImageCloseIcon = styled.img`
  width: 50px;
  height: 50px;
  background-image: url(${Close});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  position: absolute;
  left: 390px;
  top: -20px;
  cursor: pointer;
`

const UploadImgContainner = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  box-sizing: border-box;
  cursor: pointer;
`

const ImageResult = styled.div`
  width: 200px;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  border-radius: 10px;

  border: 1px solid black;
`

const WarningWrap = styled.div`
  width: 100%;
  color: red;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
`

const CostInputWrap = styled.div`
  width: 100%;
`

const CostInput = styled.input`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  outline: none;
  font-size: 20px;
  font-weight: 500;
`

const SubmitBtn = styled.button`
  width: 620px;  
  box-sizing: border-box;
  padding: 20px;
  outline: none;
  border: none;
  border-radius: 20px;
  background-color: #003594;
  color: white;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 30px;
`

const LeftArrowDiv = styled.div`
  width: 35px;
  height: 35px;
  background-image: url(${BackButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const RightArrowDiv = styled.div`
  width: 35px;
  height: 35px;
`

export default App;
