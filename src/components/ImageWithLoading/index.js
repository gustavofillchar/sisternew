import React from 'react';

import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);

export default function ImageWithLoading(props) {
  return (
    <Image
      indicatorProps={{
        color: '#aaa',
      }}
      {...props}
    />
  );
}
