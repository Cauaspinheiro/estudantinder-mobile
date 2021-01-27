import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import ImagePickerCard from '../molecules/ImagePickerCard'

interface RenderItemProps {
  item: string
  index: number
}

export interface PhotosCarrouselProps {
  photos: string[]

  onSelect(index: number): void
}

const PhotosCarrousel: React.FC<PhotosCarrouselProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <View style={{ flex: 1, marginVertical: 40 }}>
      <Carousel
        data={props.photos}
        renderItem={({ item, index }: RenderItemProps) => {
          return (
            <ImagePickerCard
              imageUri={item}
              onPress={() => props.onSelect(index)}
            />
          )
        }}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={210}
        onSnapToItem={(index) => setActiveIndex(index)}
      />

      <Pagination
        dotsLength={props.photos.length}
        activeDotIndex={activeIndex}
        dotStyle={{ width: 30, height: 4, marginHorizontal: -6 }}
        inactiveDotColor="#B3B3B3"
        dotColor="#666"
        animatedDuration={150}
        animatedFriction={10}
        animatedTension={10}
        inactiveDotScale={0.8}
        containerStyle={{ paddingBottom: 0 }}
      />
    </View>
  )
}

export default PhotosCarrousel