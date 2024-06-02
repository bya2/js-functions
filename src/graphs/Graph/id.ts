// fn edges_walker_mut<E, Ix>(
//   edges: &mut [Edge<E, Ix>],
//   next: EdgeIndex<Ix>,
//   dir: Direction,
// ) -> EdgesWalkerMut<E, Ix>
// where
//   Ix: IndexType,
// {
//   EdgesWalkerMut { edges, next, dir }
// }

// impl<'a, E, Ix> EdgesWalkerMut<'a, E, Ix>
// where
//   Ix: IndexType,
// {
//   fn next_edge(&mut self) -> Option<&mut Edge<E, Ix>> {
//       self.next().map(|t| t.1)
//   }

//   fn next(&mut self) -> Option<(EdgeIndex<Ix>, &mut Edge<E, Ix>)> {
//       let this_index = self.next;
//       let k = self.dir.index();
//       match self.edges.get_mut(self.next.index()) {
//           None => None,
//           Some(edge) => {
//               self.next = edge.next[k];
//               Some((this_index, edge))
//           }
//       }
//   }
// }

// class EdgesWalker {
//   edges
// }
