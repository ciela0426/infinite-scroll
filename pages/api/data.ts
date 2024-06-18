// pages/api/data.ts

import { NextApiRequest, NextApiResponse } from "next";

// 페이지 번호와 데이터 개수를 받아 임시 데이터를 생성하는 함수
const generateData = (page: number, limit: number) => {
  return Array.from(
    { length: limit },
    (_, i) => `Item ${(page - 1) * limit + i + 1}`
  );
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 페이지 번호와 개수를 가져옴
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const data = generateData(pageNum, limitNum); // 데이터를 생성
  res.status(200).json(data); // 생성된 데이터를 JSON 형식으로 반환
};
