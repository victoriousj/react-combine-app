import React from "react";

import { ContainerSC } from "./StyledComponents";
import { spaceBarrageHelpers } from "../../helpers";

import Ship from "./Ship";
import Score from "./Score";
import Guide from "./Guide";

export default class Container extends React.Component {
  render() {
    const stars = spaceBarrageHelpers.addStars(10);
    const enemies = spaceBarrageHelpers.addEnemies(15);

    return (
      <ContainerSC>
        <Score />
        {stars}
        {enemies}
        <Ship />
        <Guide />
      </ContainerSC>
    );
  }
}
