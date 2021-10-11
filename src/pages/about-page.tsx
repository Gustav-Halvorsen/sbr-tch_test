import React from "react";
import { Heading, Grid, GridItem, Image, Text, ListItem, List } from "@chakra-ui/react";
import avatar from "assets/images/avatar.jpg";

export const AboutPage: React.FC = () => {
  return (
    <>
      <Heading as="h3" fontWeight={500} mb={8}>
        О приложении
      </Heading>
      <Grid
        templateRows={"repeat(1, 1fr)"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        <GridItem>
          <Image src={avatar} alt="Waiting dog" />
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={{
            xl: 3,
            base: 1,
          }}
        >
          <Grid templateRows={"repeat(1, 1fr)"} gap={6}>
            <GridItem>
              <Heading as="h5" size={"md"} mb={2} fontWeight={500}>
                Short
              </Heading>
              <Text fontWeight={300}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores et minus, molestias nobis
                officiis ratione saepe sed ut voluptatem! Accusamus aperiam consectetur, eaque eius eum
                excepturi magni provident quos sapiente! Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Accusantium aperiam asperiores excepturi nostrum nulla! Accusantium consectetur
                consequatur delectus distinctio labore nulla voluptas. Alias asperiores, excepturi illo labore
                laboriosam perferendis ut?
              </Text>
            </GridItem>
            <GridItem rowSpan={2}>
              <Heading as="h5" size={"md"} mb={2} fontWeight={500}>
                Long
              </Heading>
              <Text mb={3} fontWeight={300}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores et minus, molestias nobis
                officiis ratione saepe sed ut voluptatem! Accusamus aperiam consectetur, eaque eius eum
                excepturi magni provident quos sapiente! Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Accusantium aperiam asperiores excepturi nostrum nulla! Accusantium consectetur
                consequatur delectus distinctio labore nulla voluptas. Alias asperiores, excepturi illo labore
                laboriosam perferendis ut?
              </Text>
              <Text fontWeight={300}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores et minus, molestias nobis
                officiis ratione saepe sed ut voluptatem! Accusamus aperiam consectetur, eaque eius eum
                excepturi magni provident quos sapiente! Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Accusantium aperiam asperiores excepturi nostrum nulla! Accusantium consectetur
                consequatur delectus distinctio labore nulla voluptas. Alias asperiores, excepturi illo labore
                laboriosam perferendis ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                cupiditate debitis distinctio ea eveniet expedita harum inventore ipsam laboriosam molestiae
                nobis nostrum placeat praesentium quam quo, repellat tempora unde velit!
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Heading as="h5" size={"md"} mb={2} fontWeight={500}>
            Used
          </Heading>
          <List
            mb={{
              base: 8,
            }}
          >
            <ListItem fontWeight={300}>React</ListItem>
            <ListItem fontWeight={300}>TypeScript</ListItem>
            <ListItem fontWeight={300}>Chakra ui</ListItem>
            <ListItem fontWeight={300}>Redux Toolkit</ListItem>
            <ListItem fontWeight={300}>React-virtual</ListItem>
          </List>
        </GridItem>
      </Grid>
    </>
  );
};
