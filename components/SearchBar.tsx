import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props{
    placeholder: string,
    value?: string,
    onChangeText?: (text: string) => void,
    onPress?: () => void
}

const SearchBar = ({placeholder, onPress, value, onChangeText}: Props) => {
  return (
    <View className='flex flex-row rounded-3xl px-5 py-2 bg-dark-200 items-center'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bfff"/>
      <TextInput 
      onPress={onPress}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#ab8bff"
      className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar