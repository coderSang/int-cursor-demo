<script setup lang="ts">
import { Plot } from '@int/geotoolkit3d/Plot'
import { Grid } from '@int/geotoolkit3d/scene/grid/Grid'
import { CompassAxis } from '@int/geotoolkit3d/scene/compass/CompassAxis'
import { CursorTool } from '@int/geotoolkit3d/tool/cursor/CursorTool'
import { AbstractDeviceSupport } from '@int/geotoolkit3d/tool/devicesupport/AbstractDeviceSupport'
import { DoubleSide, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { Object3D } from '@int/geotoolkit3d/scene/Object3D'
import { FilledEllipseGeometry } from '@int/geotoolkit3d/scene/ellipse/FilledEllipseGeometry'

function initPlot(divElement: HTMLDivElement) {
  const lookAt = new Vector3(0, 0, 0)
  const position = new Vector3().copy(lookAt.clone()).sub(new Vector3(0, 800, 0))

  const perspectivePlot = new Plot({
    container: divElement,
    camera: {
      position: position,
      lookat: lookAt
    }
  })

  const grid = new Grid({
    start: new Vector3(-300, -350, -200),
    end: new Vector3(400, 350, 200)
  })
  perspectivePlot.getRoot().add(grid)

  perspectivePlot.getCompass().setCompassObject(new CompassAxis())
  return perspectivePlot
}

function createScene(divElement: HTMLDivElement) {
  const plot = initPlot(divElement)
  const c = new Vector3()
  plot.getModelLimits().getCenter(c)
  plot.moveCamera(c.clone().addScalar(500), c)
  plot.addTool(new CursorTool({ name: 'MyCursorTool' }))
  ;(plot.getToolByName('MyCursorTool') as CursorTool).addMoveListener(
    (event: AbstractDeviceSupport.CustomPointerEvent, selection) => {
      console.log(event, selection)
    }
  )
  const group = new Object3D()
  plot.getRoot().add(group)
  const geometry = new FilledEllipseGeometry()
  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({ color: 'yellow', side: DoubleSide, transparent: true, opacity: 0.7 })
  )
  mesh.scale.copy(new Vector3(100, 100, 10))
  mesh.position.copy(new Vector3(200, 200, 200))
  group.add(mesh)
  return plot
}
const indexWrapper = ref()
onMounted(() => {
  createScene(indexWrapper.value)
})
</script>

<template>
  <div class="index-wrapper" ref="indexWrapper"></div>
</template>

<style scoped lang="less">
.index-wrapper {
  height: 1000px;
}
</style>
