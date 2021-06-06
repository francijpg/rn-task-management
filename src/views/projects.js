import React from 'react';
import {
  Button,
  Text,
  Center,
  Stack,
  Box,
  List,
  Heading,
  VStack,
} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {GET_PROJECTS} from '../gql/projects';
import {StyleSheet} from 'react-native';

const Projects = () => {
  const {data, loading, error} = useQuery(GET_PROJECTS);
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  const navigation = useNavigation();
  if (loading || error) {
    return null;
  }
  const {getProjects} = data;

  return (
    <>
      {/* {loading && <Text>Cargando...</Text>} */}
      <Center flex={1} bgColor={'#e84347'}>
        <VStack space={4} flex={1} w="90%" mt={4}>
          <Text style={globalStyles.title}>task management</Text>
          <Button
            style={globalStyles.button}
            onPress={() => navigation.navigate('NewProject')}>
            <Text style={globalStyles.buttonText}>new project</Text>
          </Button>
          <Heading py={4} style={globalStyles.subtitle}>
            My Projects
          </Heading>
          <List.Ordered my={0} space={3} style={styles.list}>
            {getProjects.map(project => (
              <List.Item
                key={project.id}
                bgColor="light.100"
                onPress={() => navigation.navigate('Project', project)}>
                {project.name}
              </List.Item>
            ))}
          </List.Ordered>
        </VStack>
      </Center>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    borderWidth: 0,
  },
});

export default Projects;
