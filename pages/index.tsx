import { connectToDatabase } from "../util/mongodb";

export default function Home() {
  return (
    <div>
      <br />
      <br />
      <br />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit
        aliquid fugiat non quas nihil eligendi? Eaque, quaerat ullam. Aliquam,
        laboriosam quam nostrum debitis id itaque voluptatem labore impedit
        recusandae dolorum porro facilis fugiat distinctio, consequatur quidem
        earum? Accusamus earum numquam, et, a repellat similique commodi harum
        natus vero, at consectetur molestiae? Quidem quas quibusdam dolorem! Id,
        reiciendis rerum blanditiis dignissimos ullam dolores accusantium
        officia facilis sunt ratione molestias eveniet atque consequatur eius
        dolore animi veritatis inventore asperiores! Repudiandae recusandae
        quidem ipsa ratione deleniti eveniet repellendus earum quibusdam
        voluptatem pariatur, reiciendis dolorum dolores dolore, magni ut
        incidunt vitae omnis rerum quaerat totam assumenda. Libero, minima optio
        voluptatum provident quae aliquid in, sint aut dicta exercitationem
        laboriosam aliquam. Nisi, quis, modi impedit, esse similique iste
        ratione iusto iure inventore quos laboriosam voluptate quo debitis? Amet
        maiores velit explicabo, nemo illum a iste repellendus possimus deserunt
        saepe quasi eos. Officia sapiente fugit sunt voluptates, beatae sint
        illo possimus. Vero eius voluptate illo accusamus beatae, id natus
        eligendi cupiditate magni incidunt praesentium assumenda quod
        exercitationem similique voluptatem rem omnis deleniti commodi doloribus
        excepturi voluptatum, odio laboriosam cum! Excepturi quae, illo
        explicabo qui magnam recusandae delectus culpa quam, deserunt tenetur
        corrupti deleniti voluptatum, accusantium nulla voluptates magni quis
        maxime cupiditate at consequatur! A, quod! Sapiente fugit est alias.
        Tenetur dignissimos vero quasi consequuntur vitae quos voluptates
        eligendi a nulla sint tempora deserunt soluta veritatis, harum nisi ea
        odio commodi esse porro obcaecati repellendus perspiciatis, maxime
        ratione dicta! Reiciendis praesentium ex quidem, exercitationem dolorem
        dolor excepturi incidunt ratione obcaecati laboriosam possimus vero eos
        repellat beatae, quibusdam quo fugit illo asperiores numquam officia
        similique delectus aliquid. Fuga velit, molestias cum debitis distinctio
        vel ex natus, alias amet vero omnis blanditiis animi ipsa laudantium
        fugit perspiciatis placeat qui soluta quibusdam consequuntur optio
        eligendi voluptatibus recusandae commodi? Laudantium aspernatur debitis,
        deserunt laboriosam optio dolorum, veritatis facilis consequuntur velit
        fugiat, magnam quo quia. Enim provident vero quos assumenda in impedit
        culpa! Debitis praesentium architecto dolores accusantium officiis.
        Libero velit at in minima? Ipsa amet, distinctio voluptatibus autem
        quibusdam enim, harum libero ea, iure nostrum consectetur nulla?
        Sapiente animi incidunt culpa totam magni qui? Sint repudiandae
        explicabo inventore assumenda eum odio iste, ipsa laudantium est sed
        numquam voluptates corrupti dolores quia obcaecati, repellat id.
        Voluptate iusto aperiam repellat eius velit dignissimos quasi impedit,
        dicta illum quidem ipsa, ipsum iste eos corrupti ab. Culpa, eum delectus
        dolor sit harum aperiam at?
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
