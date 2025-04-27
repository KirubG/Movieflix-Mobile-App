import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { updateSearchCount } from "@/services/appWrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const timeId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => {
      clearTimeout(timeId);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          gap: 20,
          justifyContent: "flex-start",
          marginBottom: 10,
          paddingRight: 5,
        }}
        className="mt-2 pb-32 px-5"
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center">
              <Image
                source={icons.logo}
                className=" w-12 h-10 mt-10 mb-5 mx-auto "
              />
            </View>
            <View className="my-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                onPress={() => {}}
                placeholder="Search movies ..."
              />
            </View>

            {movieLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            )}
            {movieError && (
              <Text className="text-red-500 px-5 text-center my-3">
                Error: {movieError?.message}
              </Text>
            )}

            {!movieLoading &&
              !movieError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold mb-3">
                  Search Results for {""}
                  <Text className="text-accent font-bold">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <Text className="text-gray-500 text-center mt-10">
              {searchQuery.trim()
                ? "No results found"
                : "Search for movies to see results"}
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
