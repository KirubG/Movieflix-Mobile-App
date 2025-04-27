import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  let router = useRouter()
  const {data: movies, loading:movieLoading, error:movieError} = useFetch(()=>fetchMovies({
    query: "",

  }))
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 50 }}
      >
        <Image source={icons.logo} className=" w-12 h-10 mt-10 mb-5 mx-auto " />

        {movieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError ? (
          <Text className="text-white text-center mt-10">
            {movieError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movie"
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              <FlatList 
               data={movies}
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  gap: 20,
                  justifyContent: "flex-start",
                  marginBottom: 10,
                  paddingRight: 5,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false} 
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
