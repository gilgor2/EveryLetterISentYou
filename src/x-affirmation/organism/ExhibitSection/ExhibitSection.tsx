import React from 'react';
import PaintingDiagonal from '../PaintingDiagonal/PaintingDiagonal';

export default function ExhibitSection() {
	// 여러 화면을 랜덤으로 띄워주는 역할
	return (
  <div data-testid="exhibitSection">
    <PaintingDiagonal />
  </div>
	);
}
