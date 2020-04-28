import React from 'react';
import {Container} from './styles';
import QRCodeScanner from '~/components/QRCodeScanner';

export default function ScannerStudent() {
  return (
    <Container>
      <QRCodeScanner />
    </Container>
  );
}
