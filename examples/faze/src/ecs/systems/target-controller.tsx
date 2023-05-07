import { useFrame } from "@react-three/fiber";
import { useEntities } from "miniplex/react";
import { Vector3 } from "three";
import { copy, distanceToSquared, equal, reset, sub } from "../../math/vectors";
import { noop } from "../../utils/functions";
import { world } from "../store";

const V1 = new Vector3();

export function useTargetController() {
  const { entities } = useEntities(
    world.with("target", "velocity", "sceneObject")
  );

  useFrame((_, delta) => {
    for (let i = 0; i < entities.length; i++) {
      const {
        target,
        velocity,
        sceneObject,
        speed,
        onWorldEvent = noop,
      } = entities[i];

      if (equal(sceneObject.position, target)) {
        continue;
      }

      if (entities[i].rigidBody) {
        // We set the target Y axis for rigid bodies as they can't move along the Y axis.
        // This ends up making the Y axis irrelevant for rigid bodies but still allows kinematic
        // bodies to move along the Y axis.
        target.y = sceneObject.position.y;
      }

      if (Math.abs(distanceToSquared(sceneObject.position, target)) <= delta) {
        // We'll reach the target in the next frame, we're done!
        if (entities[i].state !== "idle") {
          entities[i].state = "idle";

          onWorldEvent("move-stop");
          onWorldEvent("target-reached");

          copy(target, sceneObject.position);
          reset(velocity);
        }

        continue;
      }

      const nextVelocityVector = sub(copy(V1, target), sceneObject.position)
        .normalize()
        .multiplyScalar(speed || 1);

      copy(velocity, nextVelocityVector);
    }
  });
}
