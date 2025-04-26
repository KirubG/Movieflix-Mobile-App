import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const SearchBar = () => {
  return (
    <View className='flex flex-row rounded-full px-5 py-4 bg-dark-200 items-center'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bfff"/>
      <TextInput 
      onPress={()=>{}}
      placeholder='Search a movie'
      value=''
      onChangeText={()=>{}}
      placeholderTextColor="#ab8bff"
      />
    </View>
  )
}

export default SearchBar