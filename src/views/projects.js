import React from 'react';
import {Button, Text, Center, List, Heading, VStack} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {GET_PROJECTS} from '../gql/projects';
import {StyleSheet} from 'react-native';

const Projects = () => {
  const {data, loading, error} = useQuery(GET_PROJECTS);
  const navigation = useNavigation();
  if (loading || error) {
    return null;
  }
  const {getProjects} = data;

  return (
    <>
      {loading && <Text>Loading...</Text>}
      <Center flex={1} bgColor={'#e84347'}>
        <VStack space={4} flex={1} w="90%" mt={4}>
          <Text style={globalStyles.title}>task management</Text>
          <Button
            style={globalStyles.button}
            onPress={() => navigation.navigate('NewProject')}>
            <Text style={globalStyles.buttonText}>new project</Text>
          </Button>
          <Heading mt="10" size="md" color="light.100" textAlign={['center']}>
            My Projects
          </Heading>
          <List.Ordered my={0} space={1} style={styles.list}>
            {getProjects.map(project => (
              <List.Item
                _text={{
                  fontSize: 25,
                  fontWeight: 'bold',
                }}
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
