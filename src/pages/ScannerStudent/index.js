import React from 'react';
import {Container} from './styles';
import QRCodeScanner from '~/components/QRCodeScannerModal';

export default function ScannerStudent() {
  return (
    <Container>
      <QRCodeScanner />
    </Container>
  );
}
