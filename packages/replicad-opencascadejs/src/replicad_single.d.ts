export declare class Precision {
  constructor();
  static Angular(): Quantity_AbsorbedDose;
  static Confusion(): Quantity_AbsorbedDose;
  static SquareConfusion(): Quantity_AbsorbedDose;
  static Intersection(): Quantity_AbsorbedDose;
  static Approximation(): Quantity_AbsorbedDose;
  static Parametric_1(P: Quantity_AbsorbedDose, T: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  static PConfusion_1(T: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  static SquarePConfusion(): Quantity_AbsorbedDose;
  static PIntersection_1(T: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  static PApproximation_1(T: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  static Parametric_2(P: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  static PConfusion_2(): Quantity_AbsorbedDose;
  static PIntersection_2(): Quantity_AbsorbedDose;
  static PApproximation_2(): Quantity_AbsorbedDose;
  static IsInfinite(R: Quantity_AbsorbedDose): Standard_Boolean;
  static IsPositiveInfinite(R: Quantity_AbsorbedDose): Standard_Boolean;
  static IsNegativeInfinite(R: Quantity_AbsorbedDose): Standard_Boolean;
  static Infinite(): Quantity_AbsorbedDose;
  delete(): void;
}

export declare class Geom2dConvert_BSplineCurveToBezierCurve {
  Arc(Index: Graphic3d_ZLayerId): Handle_Geom2d_BezierCurve;
  Arcs(Curves: TColGeom2d_Array1OfBezierCurve): void;
  Knots(TKnots: TColStd_Array1OfReal): void;
  NbArcs(): Graphic3d_ZLayerId;
  delete(): void;
}

  export declare class Geom2dConvert_BSplineCurveToBezierCurve_1 extends Geom2dConvert_BSplineCurveToBezierCurve {
    constructor(BasisCurve: Handle_Geom2d_BSplineCurve);
  }

  export declare class Geom2dConvert_BSplineCurveToBezierCurve_2 extends Geom2dConvert_BSplineCurveToBezierCurve {
    constructor(BasisCurve: Handle_Geom2d_BSplineCurve, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, ParametricTolerance: Quantity_AbsorbedDose);
  }

export declare class Geom2dConvert {
  constructor();
  static SplitBSplineCurve_1(C: Handle_Geom2d_BSplineCurve, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, SameOrientation: Standard_Boolean): Handle_Geom2d_BSplineCurve;
  static SplitBSplineCurve_2(C: Handle_Geom2d_BSplineCurve, FromU1: Quantity_AbsorbedDose, ToU2: Quantity_AbsorbedDose, ParametricTolerance: Quantity_AbsorbedDose, SameOrientation: Standard_Boolean): Handle_Geom2d_BSplineCurve;
  static CurveToBSplineCurve(C: Handle_Geom2d_Curve, Parameterisation: Convert_ParameterisationType): Handle_Geom2d_BSplineCurve;
  static ConcatG1(ArrayOfCurves: TColGeom2d_Array1OfBSplineCurve, ArrayOfToler: TColStd_Array1OfReal, ArrayOfConcatenated: Handle_TColGeom2d_HArray1OfBSplineCurve, ClosedFlag: Standard_Boolean, ClosedTolerance: Quantity_AbsorbedDose): void;
  static ConcatC1_1(ArrayOfCurves: TColGeom2d_Array1OfBSplineCurve, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: Handle_TColStd_HArray1OfInteger, ArrayOfConcatenated: Handle_TColGeom2d_HArray1OfBSplineCurve, ClosedFlag: Standard_Boolean, ClosedTolerance: Quantity_AbsorbedDose): void;
  static ConcatC1_2(ArrayOfCurves: TColGeom2d_Array1OfBSplineCurve, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: Handle_TColStd_HArray1OfInteger, ArrayOfConcatenated: Handle_TColGeom2d_HArray1OfBSplineCurve, ClosedFlag: Standard_Boolean, ClosedTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): void;
  static C0BSplineToC1BSplineCurve(BS: Handle_Geom2d_BSplineCurve, Tolerance: Quantity_AbsorbedDose): void;
  static C0BSplineToArrayOfC1BSplineCurve_1(BS: Handle_Geom2d_BSplineCurve, tabBS: Handle_TColGeom2d_HArray1OfBSplineCurve, Tolerance: Quantity_AbsorbedDose): void;
  static C0BSplineToArrayOfC1BSplineCurve_2(BS: Handle_Geom2d_BSplineCurve, tabBS: Handle_TColGeom2d_HArray1OfBSplineCurve, AngularTolerance: Quantity_AbsorbedDose, Tolerance: Quantity_AbsorbedDose): void;
  delete(): void;
}

export declare class Poly_Triangle {
  Set_1(theN1: Graphic3d_ZLayerId, theN2: Graphic3d_ZLayerId, theN3: Graphic3d_ZLayerId): void;
  Set_2(theIndex: Graphic3d_ZLayerId, theNode: Graphic3d_ZLayerId): void;
  Get(theN1: Graphic3d_ZLayerId, theN2: Graphic3d_ZLayerId, theN3: Graphic3d_ZLayerId): void;
  Value(theIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  ChangeValue(theIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  delete(): void;
}

  export declare class Poly_Triangle_1 extends Poly_Triangle {
    constructor();
  }

  export declare class Poly_Triangle_2 extends Poly_Triangle {
    constructor(theN1: Graphic3d_ZLayerId, theN2: Graphic3d_ZLayerId, theN3: Graphic3d_ZLayerId);
  }

export declare class Poly_Array1OfTriangle {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: Poly_Triangle): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  Move(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  First(): Poly_Triangle;
  ChangeFirst(): Poly_Triangle;
  Last(): Poly_Triangle;
  ChangeLast(): Poly_Triangle;
  Value(theIndex: Standard_Integer): Poly_Triangle;
  ChangeValue(theIndex: Standard_Integer): Poly_Triangle;
  SetValue(theIndex: Standard_Integer, theItem: Poly_Triangle): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class Poly_Array1OfTriangle_1 extends Poly_Array1OfTriangle {
    constructor();
  }

  export declare class Poly_Array1OfTriangle_2 extends Poly_Array1OfTriangle {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class Poly_Array1OfTriangle_3 extends Poly_Array1OfTriangle {
    constructor(theOther: Poly_Array1OfTriangle);
  }

  export declare class Poly_Array1OfTriangle_4 extends Poly_Array1OfTriangle {
    constructor(theOther: Poly_Array1OfTriangle);
  }

  export declare class Poly_Array1OfTriangle_5 extends Poly_Array1OfTriangle {
    constructor(theBegin: Poly_Triangle, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class Poly_Connect {
  Load(theTriangulation: Handle_Poly_Triangulation): void;
  Triangulation(): Handle_Poly_Triangulation;
  Triangle(N: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Triangles(T: Graphic3d_ZLayerId, t1: Graphic3d_ZLayerId, t2: Graphic3d_ZLayerId, t3: Graphic3d_ZLayerId): void;
  Nodes(T: Graphic3d_ZLayerId, n1: Graphic3d_ZLayerId, n2: Graphic3d_ZLayerId, n3: Graphic3d_ZLayerId): void;
  Initialize(N: Graphic3d_ZLayerId): void;
  More(): Standard_Boolean;
  Next(): void;
  Value(): Graphic3d_ZLayerId;
  delete(): void;
}

  export declare class Poly_Connect_1 extends Poly_Connect {
    constructor();
  }

  export declare class Poly_Connect_2 extends Poly_Connect {
    constructor(theTriangulation: Handle_Poly_Triangulation);
  }

export declare class Handle_Poly_Triangulation {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Poly_Triangulation): void;
  get(): Poly_Triangulation;
  delete(): void;
}

  export declare class Handle_Poly_Triangulation_1 extends Handle_Poly_Triangulation {
    constructor();
  }

  export declare class Handle_Poly_Triangulation_2 extends Handle_Poly_Triangulation {
    constructor(thePtr: Poly_Triangulation);
  }

  export declare class Handle_Poly_Triangulation_3 extends Handle_Poly_Triangulation {
    constructor(theHandle: Handle_Poly_Triangulation);
  }

  export declare class Handle_Poly_Triangulation_4 extends Handle_Poly_Triangulation {
    constructor(theHandle: Handle_Poly_Triangulation);
  }

export declare class Poly_Triangulation extends Standard_Transient {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  Copy(): Handle_Poly_Triangulation;
  Deflection_1(): Quantity_AbsorbedDose;
  Deflection_2(theDeflection: Quantity_AbsorbedDose): void;
  RemoveUVNodes(): void;
  NbNodes(): Graphic3d_ZLayerId;
  NbTriangles(): Graphic3d_ZLayerId;
  HasUVNodes(): Standard_Boolean;
  Nodes(): TColgp_Array1OfPnt;
  ChangeNodes(): TColgp_Array1OfPnt;
  Node(theIndex: Graphic3d_ZLayerId): gp_Pnt;
  ChangeNode(theIndex: Graphic3d_ZLayerId): gp_Pnt;
  UVNodes(): TColgp_Array1OfPnt2d;
  ChangeUVNodes(): TColgp_Array1OfPnt2d;
  UVNode(theIndex: Graphic3d_ZLayerId): gp_Pnt2d;
  ChangeUVNode(theIndex: Graphic3d_ZLayerId): gp_Pnt2d;
  Triangles(): Poly_Array1OfTriangle;
  ChangeTriangles(): Poly_Array1OfTriangle;
  Triangle(theIndex: Graphic3d_ZLayerId): Poly_Triangle;
  ChangeTriangle(theIndex: Graphic3d_ZLayerId): Poly_Triangle;
  SetNormals(theNormals: Handle_TShort_HArray1OfShortReal): void;
  Normals(): TShort_Array1OfShortReal;
  ChangeNormals(): TShort_Array1OfShortReal;
  HasNormals(): Standard_Boolean;
  Normal(theIndex: Graphic3d_ZLayerId): gp_Dir;
  SetNormal(theIndex: Graphic3d_ZLayerId, theNormal: gp_Dir): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class Poly_Triangulation_1 extends Poly_Triangulation {
    constructor(nbNodes: Graphic3d_ZLayerId, nbTriangles: Graphic3d_ZLayerId, UVNodes: Standard_Boolean);
  }

  export declare class Poly_Triangulation_2 extends Poly_Triangulation {
    constructor(Nodes: TColgp_Array1OfPnt, Triangles: Poly_Array1OfTriangle);
  }

  export declare class Poly_Triangulation_3 extends Poly_Triangulation {
    constructor(Nodes: TColgp_Array1OfPnt, UVNodes: TColgp_Array1OfPnt2d, Triangles: Poly_Array1OfTriangle);
  }

  export declare class Poly_Triangulation_4 extends Poly_Triangulation {
    constructor(theTriangulation: Handle_Poly_Triangulation);
  }

export declare class Poly_PolygonOnTriangulation extends Standard_Transient {
  Copy(): Handle_Poly_PolygonOnTriangulation;
  Deflection_1(): Quantity_AbsorbedDose;
  Deflection_2(theDefl: Quantity_AbsorbedDose): void;
  NbNodes(): Graphic3d_ZLayerId;
  Nodes(): TColStd_Array1OfInteger;
  ChangeNodes(): TColStd_Array1OfInteger;
  HasParameters(): Standard_Boolean;
  Parameters(): Handle_TColStd_HArray1OfReal;
  ChangeParameters(): TColStd_Array1OfReal;
  SetParameters(theParameters: Handle_TColStd_HArray1OfReal): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Poly_PolygonOnTriangulation_1 extends Poly_PolygonOnTriangulation {
    constructor(theNbNodes: Graphic3d_ZLayerId, theHasParams: Standard_Boolean);
  }

  export declare class Poly_PolygonOnTriangulation_2 extends Poly_PolygonOnTriangulation {
    constructor(Nodes: TColStd_Array1OfInteger);
  }

  export declare class Poly_PolygonOnTriangulation_3 extends Poly_PolygonOnTriangulation {
    constructor(Nodes: TColStd_Array1OfInteger, Parameters: TColStd_Array1OfReal);
  }

export declare class Handle_Poly_PolygonOnTriangulation {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Poly_PolygonOnTriangulation): void;
  get(): Poly_PolygonOnTriangulation;
  delete(): void;
}

  export declare class Handle_Poly_PolygonOnTriangulation_1 extends Handle_Poly_PolygonOnTriangulation {
    constructor();
  }

  export declare class Handle_Poly_PolygonOnTriangulation_2 extends Handle_Poly_PolygonOnTriangulation {
    constructor(thePtr: Poly_PolygonOnTriangulation);
  }

  export declare class Handle_Poly_PolygonOnTriangulation_3 extends Handle_Poly_PolygonOnTriangulation {
    constructor(theHandle: Handle_Poly_PolygonOnTriangulation);
  }

  export declare class Handle_Poly_PolygonOnTriangulation_4 extends Handle_Poly_PolygonOnTriangulation {
    constructor(theHandle: Handle_Poly_PolygonOnTriangulation);
  }

export declare type BRepOffset_Mode = {
  BRepOffset_Skin: {};
  BRepOffset_Pipe: {};
  BRepOffset_RectoVerso: {};
}

export declare class NCollection_BaseList {
  Extent(): Graphic3d_ZLayerId;
  IsEmpty(): Standard_Boolean;
  Allocator(): Handle_NCollection_BaseAllocator;
  delete(): void;
}

export declare class BRepMesh_IncrementalMesh extends BRepMesh_DiscretRoot {
  Perform_1(theRange: Message_ProgressRange): void;
  Perform_2(theContext: any, theRange: Message_ProgressRange): void;
  Parameters(): IMeshTools_Parameters;
  ChangeParameters(): IMeshTools_Parameters;
  IsModified(): Standard_Boolean;
  GetStatusFlags(): Graphic3d_ZLayerId;
  static Discret(theShape: TopoDS_Shape, theLinDeflection: Quantity_AbsorbedDose, theAngDeflection: Quantity_AbsorbedDose, theAlgo: BRepMesh_DiscretRoot): Graphic3d_ZLayerId;
  static IsParallelDefault(): Standard_Boolean;
  static SetParallelDefault(isInParallel: Standard_Boolean): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class BRepMesh_IncrementalMesh_1 extends BRepMesh_IncrementalMesh {
    constructor();
  }

  export declare class BRepMesh_IncrementalMesh_2 extends BRepMesh_IncrementalMesh {
    constructor(theShape: TopoDS_Shape, theLinDeflection: Quantity_AbsorbedDose, isRelative: Standard_Boolean, theAngDeflection: Quantity_AbsorbedDose, isInParallel: Standard_Boolean);
  }

  export declare class BRepMesh_IncrementalMesh_3 extends BRepMesh_IncrementalMesh {
    constructor(theShape: TopoDS_Shape, theParameters: IMeshTools_Parameters, theRange: Message_ProgressRange);
  }

export declare class BRepMesh_DiscretRoot extends Standard_Transient {
  SetShape(theShape: TopoDS_Shape): void;
  Shape(): TopoDS_Shape;
  IsDone(): Standard_Boolean;
  Perform(theRange: Message_ProgressRange): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class BRepAlgoAPI_Section extends BRepAlgoAPI_BooleanOperation {
  Init1_1(S1: TopoDS_Shape): void;
  Init1_2(Pl: gp_Pln): void;
  Init1_3(Sf: Handle_Geom_Surface): void;
  Init2_1(S2: TopoDS_Shape): void;
  Init2_2(Pl: gp_Pln): void;
  Init2_3(Sf: Handle_Geom_Surface): void;
  Approximation(B: Standard_Boolean): void;
  ComputePCurveOn1(B: Standard_Boolean): void;
  ComputePCurveOn2(B: Standard_Boolean): void;
  Build(): void;
  HasAncestorFaceOn1(E: TopoDS_Shape, F: TopoDS_Shape): Standard_Boolean;
  HasAncestorFaceOn2(E: TopoDS_Shape, F: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

  export declare class BRepAlgoAPI_Section_1 extends BRepAlgoAPI_Section {
    constructor();
  }

  export declare class BRepAlgoAPI_Section_2 extends BRepAlgoAPI_Section {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Section_3 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_4 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_5 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, Pl: gp_Pln, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_6 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, Sf: Handle_Geom_Surface, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_7 extends BRepAlgoAPI_Section {
    constructor(Sf: Handle_Geom_Surface, S2: TopoDS_Shape, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_8 extends BRepAlgoAPI_Section {
    constructor(Sf1: Handle_Geom_Surface, Sf2: Handle_Geom_Surface, PerformNow: Standard_Boolean);
  }

export declare class BRepAlgoAPI_BooleanOperation extends BRepAlgoAPI_BuilderAlgo {
  Shape1(): TopoDS_Shape;
  Shape2(): TopoDS_Shape;
  SetTools(theLS: TopTools_ListOfShape): void;
  Tools(): TopTools_ListOfShape;
  SetOperation(theBOP: BOPAlgo_Operation): void;
  Operation(): BOPAlgo_Operation;
  Build(): void;
  delete(): void;
}

  export declare class BRepAlgoAPI_BooleanOperation_1 extends BRepAlgoAPI_BooleanOperation {
    constructor();
  }

  export declare class BRepAlgoAPI_BooleanOperation_2 extends BRepAlgoAPI_BooleanOperation {
    constructor(thePF: BOPAlgo_PaveFiller);
  }

export declare class BRepAlgoAPI_Cut extends BRepAlgoAPI_BooleanOperation {
  delete(): void;
}

  export declare class BRepAlgoAPI_Cut_1 extends BRepAlgoAPI_Cut {
    constructor();
  }

  export declare class BRepAlgoAPI_Cut_2 extends BRepAlgoAPI_Cut {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Cut_3 extends BRepAlgoAPI_Cut {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape);
  }

  export declare class BRepAlgoAPI_Cut_4 extends BRepAlgoAPI_Cut {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, bFWD: Standard_Boolean);
  }

export declare class BRepAlgoAPI_Algo extends BRepBuilderAPI_MakeShape {
  Shape(): TopoDS_Shape;
  Clear(): void;
  SetRunParallel(theFlag: Standard_Boolean): void;
  RunParallel(): Standard_Boolean;
  SetFuzzyValue(theFuzz: Quantity_AbsorbedDose): void;
  FuzzyValue(): Quantity_AbsorbedDose;
  HasErrors(): Standard_Boolean;
  HasWarnings(): Standard_Boolean;
  HasError(theType: Handle_Standard_Type): Standard_Boolean;
  HasWarning(theType: Handle_Standard_Type): Standard_Boolean;
  DumpErrors(theOS: Standard_OStream): void;
  DumpWarnings(theOS: Standard_OStream): void;
  ClearWarnings(): void;
  GetReport(): Handle_Message_Report;
  SetProgressIndicator(theProgress: Message_ProgressScope): void;
  SetUseOBB(theUseOBB: Standard_Boolean): void;
  delete(): void;
}

export declare class BRepAlgoAPI_BuilderAlgo extends BRepAlgoAPI_Algo {
  SetArguments(theLS: TopTools_ListOfShape): void;
  Arguments(): TopTools_ListOfShape;
  SetNonDestructive(theFlag: Standard_Boolean): void;
  NonDestructive(): Standard_Boolean;
  SetGlue(theGlue: BOPAlgo_GlueEnum): void;
  Glue(): BOPAlgo_GlueEnum;
  SetCheckInverted(theCheck: Standard_Boolean): void;
  CheckInverted(): Standard_Boolean;
  Build(): void;
  SimplifyResult(theUnifyEdges: Standard_Boolean, theUnifyFaces: Standard_Boolean, theAngularTol: Quantity_AbsorbedDose): void;
  Modified(theS: TopoDS_Shape): TopTools_ListOfShape;
  Generated(theS: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(aS: TopoDS_Shape): Standard_Boolean;
  HasModified(): Standard_Boolean;
  HasGenerated(): Standard_Boolean;
  HasDeleted(): Standard_Boolean;
  SetToFillHistory(theHistFlag: Standard_Boolean): void;
  HasHistory(): Standard_Boolean;
  SectionEdges(): TopTools_ListOfShape;
  DSFiller(): BOPAlgo_PPaveFiller;
  Builder(): BOPAlgo_PBuilder;
  History(): Handle_BRepTools_History;
  delete(): void;
}

  export declare class BRepAlgoAPI_BuilderAlgo_1 extends BRepAlgoAPI_BuilderAlgo {
    constructor();
  }

  export declare class BRepAlgoAPI_BuilderAlgo_2 extends BRepAlgoAPI_BuilderAlgo {
    constructor(thePF: BOPAlgo_PaveFiller);
  }

export declare class BRepAlgoAPI_Fuse extends BRepAlgoAPI_BooleanOperation {
  delete(): void;
}

  export declare class BRepAlgoAPI_Fuse_1 extends BRepAlgoAPI_Fuse {
    constructor();
  }

  export declare class BRepAlgoAPI_Fuse_2 extends BRepAlgoAPI_Fuse {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Fuse_3 extends BRepAlgoAPI_Fuse {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape);
  }

  export declare class BRepAlgoAPI_Fuse_4 extends BRepAlgoAPI_Fuse {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller);
  }

export declare class BRepAlgoAPI_Common extends BRepAlgoAPI_BooleanOperation {
  delete(): void;
}

  export declare class BRepAlgoAPI_Common_1 extends BRepAlgoAPI_Common {
    constructor();
  }

  export declare class BRepAlgoAPI_Common_2 extends BRepAlgoAPI_Common {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Common_3 extends BRepAlgoAPI_Common {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape);
  }

  export declare class BRepAlgoAPI_Common_4 extends BRepAlgoAPI_Common {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, PF: BOPAlgo_PaveFiller);
  }

export declare class Geom2d_Conic extends Geom2d_Curve {
  SetAxis(theA: gp_Ax22d): void;
  SetXAxis(theAX: gp_Ax2d): void;
  SetYAxis(theAY: gp_Ax2d): void;
  SetLocation(theP: gp_Pnt2d): void;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Eccentricity(): Quantity_AbsorbedDose;
  Location(): gp_Pnt2d;
  Position(): gp_Ax22d;
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom2d_BezierCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_BezierCurve): void;
  get(): Geom2d_BezierCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_BezierCurve_1 extends Handle_Geom2d_BezierCurve {
    constructor();
  }

  export declare class Handle_Geom2d_BezierCurve_2 extends Handle_Geom2d_BezierCurve {
    constructor(thePtr: Geom2d_BezierCurve);
  }

  export declare class Handle_Geom2d_BezierCurve_3 extends Handle_Geom2d_BezierCurve {
    constructor(theHandle: Handle_Geom2d_BezierCurve);
  }

  export declare class Handle_Geom2d_BezierCurve_4 extends Handle_Geom2d_BezierCurve {
    constructor(theHandle: Handle_Geom2d_BezierCurve);
  }

export declare class Geom2d_BezierCurve extends Geom2d_BoundedCurve {
  Increase(Degree: Graphic3d_ZLayerId): void;
  InsertPoleAfter(Index: Graphic3d_ZLayerId, P: gp_Pnt2d, Weight: Quantity_AbsorbedDose): void;
  InsertPoleBefore(Index: Graphic3d_ZLayerId, P: gp_Pnt2d, Weight: Quantity_AbsorbedDose): void;
  RemovePole(Index: Graphic3d_ZLayerId): void;
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Segment(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose): void;
  SetPole_1(Index: Graphic3d_ZLayerId, P: gp_Pnt2d): void;
  SetPole_2(Index: Graphic3d_ZLayerId, P: gp_Pnt2d, Weight: Quantity_AbsorbedDose): void;
  SetWeight(Index: Graphic3d_ZLayerId, Weight: Quantity_AbsorbedDose): void;
  IsClosed(): Standard_Boolean;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Graphic3d_ZLayerId;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  EndPoint(): gp_Pnt2d;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  NbPoles(): Graphic3d_ZLayerId;
  Pole(Index: Graphic3d_ZLayerId): gp_Pnt2d;
  Poles_1(P: TColgp_Array1OfPnt2d): void;
  Poles_2(): TColgp_Array1OfPnt2d;
  StartPoint(): gp_Pnt2d;
  Weight(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf2d): void;
  static MaxDegree(): Graphic3d_ZLayerId;
  Resolution(ToleranceUV: Quantity_AbsorbedDose, UTolerance: Quantity_AbsorbedDose): void;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom2d_BezierCurve_1 extends Geom2d_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt2d);
  }

  export declare class Geom2d_BezierCurve_2 extends Geom2d_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt2d, PoleWeights: TColStd_Array1OfReal);
  }

export declare class Handle_Geom2d_BoundedCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_BoundedCurve): void;
  get(): Geom2d_BoundedCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_BoundedCurve_1 extends Handle_Geom2d_BoundedCurve {
    constructor();
  }

  export declare class Handle_Geom2d_BoundedCurve_2 extends Handle_Geom2d_BoundedCurve {
    constructor(thePtr: Geom2d_BoundedCurve);
  }

  export declare class Handle_Geom2d_BoundedCurve_3 extends Handle_Geom2d_BoundedCurve {
    constructor(theHandle: Handle_Geom2d_BoundedCurve);
  }

  export declare class Handle_Geom2d_BoundedCurve_4 extends Handle_Geom2d_BoundedCurve {
    constructor(theHandle: Handle_Geom2d_BoundedCurve);
  }

export declare class Geom2d_BoundedCurve extends Geom2d_Curve {
  EndPoint(): gp_Pnt2d;
  StartPoint(): gp_Pnt2d;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom2d_Geometry {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Geometry): void;
  get(): Geom2d_Geometry;
  delete(): void;
}

  export declare class Handle_Geom2d_Geometry_1 extends Handle_Geom2d_Geometry {
    constructor();
  }

  export declare class Handle_Geom2d_Geometry_2 extends Handle_Geom2d_Geometry {
    constructor(thePtr: Geom2d_Geometry);
  }

  export declare class Handle_Geom2d_Geometry_3 extends Handle_Geom2d_Geometry {
    constructor(theHandle: Handle_Geom2d_Geometry);
  }

  export declare class Handle_Geom2d_Geometry_4 extends Handle_Geom2d_Geometry {
    constructor(theHandle: Handle_Geom2d_Geometry);
  }

export declare class Geom2d_Geometry extends Standard_Transient {
  Mirror_1(P: gp_Pnt2d): void;
  Mirror_2(A: gp_Ax2d): void;
  Rotate(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): void;
  Scale(P: gp_Pnt2d, S: Quantity_AbsorbedDose): void;
  Translate_1(V: gp_Vec2d): void;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Transform(T: gp_Trsf2d): void;
  Mirrored_1(P: gp_Pnt2d): Handle_Geom2d_Geometry;
  Mirrored_2(A: gp_Ax2d): Handle_Geom2d_Geometry;
  Rotated(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): Handle_Geom2d_Geometry;
  Scaled(P: gp_Pnt2d, S: Quantity_AbsorbedDose): Handle_Geom2d_Geometry;
  Transformed(T: gp_Trsf2d): Handle_Geom2d_Geometry;
  Translated_1(V: gp_Vec2d): Handle_Geom2d_Geometry;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): Handle_Geom2d_Geometry;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom2d_Circle {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Circle): void;
  get(): Geom2d_Circle;
  delete(): void;
}

  export declare class Handle_Geom2d_Circle_1 extends Handle_Geom2d_Circle {
    constructor();
  }

  export declare class Handle_Geom2d_Circle_2 extends Handle_Geom2d_Circle {
    constructor(thePtr: Geom2d_Circle);
  }

  export declare class Handle_Geom2d_Circle_3 extends Handle_Geom2d_Circle {
    constructor(theHandle: Handle_Geom2d_Circle);
  }

  export declare class Handle_Geom2d_Circle_4 extends Handle_Geom2d_Circle {
    constructor(theHandle: Handle_Geom2d_Circle);
  }

export declare class Geom2d_Circle extends Geom2d_Conic {
  SetCirc2d(C: gp_Circ2d): void;
  SetRadius(R: Quantity_AbsorbedDose): void;
  Circ2d(): gp_Circ2d;
  Radius(): Quantity_AbsorbedDose;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Eccentricity(): Quantity_AbsorbedDose;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom2d_Circle_1 extends Geom2d_Circle {
    constructor(C: gp_Circ2d);
  }

  export declare class Geom2d_Circle_2 extends Geom2d_Circle {
    constructor(A: gp_Ax2d, Radius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class Geom2d_Circle_3 extends Geom2d_Circle {
    constructor(A: gp_Ax22d, Radius: Quantity_AbsorbedDose);
  }

export declare class Handle_Geom2d_TrimmedCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_TrimmedCurve): void;
  get(): Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_TrimmedCurve_1 extends Handle_Geom2d_TrimmedCurve {
    constructor();
  }

  export declare class Handle_Geom2d_TrimmedCurve_2 extends Handle_Geom2d_TrimmedCurve {
    constructor(thePtr: Geom2d_TrimmedCurve);
  }

  export declare class Handle_Geom2d_TrimmedCurve_3 extends Handle_Geom2d_TrimmedCurve {
    constructor(theHandle: Handle_Geom2d_TrimmedCurve);
  }

  export declare class Handle_Geom2d_TrimmedCurve_4 extends Handle_Geom2d_TrimmedCurve {
    constructor(theHandle: Handle_Geom2d_TrimmedCurve);
  }

export declare class Geom2d_TrimmedCurve extends Geom2d_BoundedCurve {
  constructor(C: Handle_Geom2d_Curve, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean)
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  SetTrim(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean): void;
  BasisCurve(): Handle_Geom2d_Curve;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  EndPoint(): gp_Pnt2d;
  FirstParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  StartPoint(): gp_Pnt2d;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: Quantity_AbsorbedDose, T: gp_Trsf2d): Quantity_AbsorbedDose;
  ParametricTransformation(T: gp_Trsf2d): Quantity_AbsorbedDose;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom2d_Curve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Curve): void;
  get(): Geom2d_Curve;
  delete(): void;
}

  export declare class Handle_Geom2d_Curve_1 extends Handle_Geom2d_Curve {
    constructor();
  }

  export declare class Handle_Geom2d_Curve_2 extends Handle_Geom2d_Curve {
    constructor(thePtr: Geom2d_Curve);
  }

  export declare class Handle_Geom2d_Curve_3 extends Handle_Geom2d_Curve {
    constructor(theHandle: Handle_Geom2d_Curve);
  }

  export declare class Handle_Geom2d_Curve_4 extends Handle_Geom2d_Curve {
    constructor(theHandle: Handle_Geom2d_Curve);
  }

export declare class Geom2d_Curve extends Geom2d_Geometry {
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  TransformedParameter(U: Quantity_AbsorbedDose, T: gp_Trsf2d): Quantity_AbsorbedDose;
  ParametricTransformation(T: gp_Trsf2d): Quantity_AbsorbedDose;
  Reversed(): Handle_Geom2d_Curve;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Value(U: Quantity_AbsorbedDose): gp_Pnt2d;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Geom2d_Line extends Geom2d_Curve {
  SetLin2d(L: gp_Lin2d): void;
  SetDirection(V: gp_Dir2d): void;
  Direction(): gp_Dir2d;
  SetLocation(P: gp_Pnt2d): void;
  Location(): gp_Pnt2d;
  SetPosition(A: gp_Ax2d): void;
  Position(): gp_Ax2d;
  Lin2d(): gp_Lin2d;
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Distance(P: gp_Pnt2d): Quantity_AbsorbedDose;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: Quantity_AbsorbedDose, T: gp_Trsf2d): Quantity_AbsorbedDose;
  ParametricTransformation(T: gp_Trsf2d): Quantity_AbsorbedDose;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom2d_Line_1 extends Geom2d_Line {
    constructor(A: gp_Ax2d);
  }

  export declare class Geom2d_Line_2 extends Geom2d_Line {
    constructor(L: gp_Lin2d);
  }

  export declare class Geom2d_Line_3 extends Geom2d_Line {
    constructor(P: gp_Pnt2d, V: gp_Dir2d);
  }

export declare class Handle_Geom2d_Line {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Line): void;
  get(): Geom2d_Line;
  delete(): void;
}

  export declare class Handle_Geom2d_Line_1 extends Handle_Geom2d_Line {
    constructor();
  }

  export declare class Handle_Geom2d_Line_2 extends Handle_Geom2d_Line {
    constructor(thePtr: Geom2d_Line);
  }

  export declare class Handle_Geom2d_Line_3 extends Handle_Geom2d_Line {
    constructor(theHandle: Handle_Geom2d_Line);
  }

  export declare class Handle_Geom2d_Line_4 extends Handle_Geom2d_Line {
    constructor(theHandle: Handle_Geom2d_Line);
  }

export declare class Geom2d_Ellipse extends Geom2d_Conic {
  SetElips2d(E: gp_Elips2d): void;
  SetMajorRadius(MajorRadius: Quantity_AbsorbedDose): void;
  SetMinorRadius(MinorRadius: Quantity_AbsorbedDose): void;
  Elips2d(): gp_Elips2d;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Directrix1(): gp_Ax2d;
  Directrix2(): gp_Ax2d;
  Eccentricity(): Quantity_AbsorbedDose;
  Focal(): Quantity_AbsorbedDose;
  Focus1(): gp_Pnt2d;
  Focus2(): gp_Pnt2d;
  MajorRadius(): Quantity_AbsorbedDose;
  MinorRadius(): Quantity_AbsorbedDose;
  Parameter(): Quantity_AbsorbedDose;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom2d_Ellipse_1 extends Geom2d_Ellipse {
    constructor(E: gp_Elips2d);
  }

  export declare class Geom2d_Ellipse_2 extends Geom2d_Ellipse {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class Geom2d_Ellipse_3 extends Geom2d_Ellipse {
    constructor(Axis: gp_Ax22d, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose);
  }

export declare class Handle_Geom2d_Ellipse {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Ellipse): void;
  get(): Geom2d_Ellipse;
  delete(): void;
}

  export declare class Handle_Geom2d_Ellipse_1 extends Handle_Geom2d_Ellipse {
    constructor();
  }

  export declare class Handle_Geom2d_Ellipse_2 extends Handle_Geom2d_Ellipse {
    constructor(thePtr: Geom2d_Ellipse);
  }

  export declare class Handle_Geom2d_Ellipse_3 extends Handle_Geom2d_Ellipse {
    constructor(theHandle: Handle_Geom2d_Ellipse);
  }

  export declare class Handle_Geom2d_Ellipse_4 extends Handle_Geom2d_Ellipse {
    constructor(theHandle: Handle_Geom2d_Ellipse);
  }

export declare class Handle_Geom2d_BSplineCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_BSplineCurve): void;
  get(): Geom2d_BSplineCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_BSplineCurve_1 extends Handle_Geom2d_BSplineCurve {
    constructor();
  }

  export declare class Handle_Geom2d_BSplineCurve_2 extends Handle_Geom2d_BSplineCurve {
    constructor(thePtr: Geom2d_BSplineCurve);
  }

  export declare class Handle_Geom2d_BSplineCurve_3 extends Handle_Geom2d_BSplineCurve {
    constructor(theHandle: Handle_Geom2d_BSplineCurve);
  }

  export declare class Handle_Geom2d_BSplineCurve_4 extends Handle_Geom2d_BSplineCurve {
    constructor(theHandle: Handle_Geom2d_BSplineCurve);
  }

export declare class Geom2d_BSplineCurve extends Geom2d_BoundedCurve {
  IncreaseDegree(Degree: Graphic3d_ZLayerId): void;
  IncreaseMultiplicity_1(Index: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncreaseMultiplicity_2(I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncrementMultiplicity(I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  InsertKnot(U: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId, ParametricTolerance: Quantity_AbsorbedDose): void;
  InsertKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  RemoveKnot(Index: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId, Tolerance: Quantity_AbsorbedDose): Standard_Boolean;
  InsertPoleAfter(Index: Graphic3d_ZLayerId, P: gp_Pnt2d, Weight: Quantity_AbsorbedDose): void;
  InsertPoleBefore(Index: Graphic3d_ZLayerId, P: gp_Pnt2d, Weight: Quantity_AbsorbedDose): void;
  RemovePole(Index: Graphic3d_ZLayerId): void;
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Segment(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, theTolerance: Quantity_AbsorbedDose): void;
  SetKnot_1(Index: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose): void;
  SetKnots(K: TColStd_Array1OfReal): void;
  SetKnot_2(Index: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId): void;
  PeriodicNormalization(U: Quantity_AbsorbedDose): void;
  SetPeriodic(): void;
  SetOrigin(Index: Graphic3d_ZLayerId): void;
  SetNotPeriodic(): void;
  SetPole_1(Index: Graphic3d_ZLayerId, P: gp_Pnt2d): void;
  SetPole_2(Index: Graphic3d_ZLayerId, P: gp_Pnt2d, Weight: Quantity_AbsorbedDose): void;
  SetWeight(Index: Graphic3d_ZLayerId, Weight: Quantity_AbsorbedDose): void;
  MovePoint(U: Quantity_AbsorbedDose, P: gp_Pnt2d, Index1: Graphic3d_ZLayerId, Index2: Graphic3d_ZLayerId, FirstModifiedPole: Graphic3d_ZLayerId, LastModifiedPole: Graphic3d_ZLayerId): void;
  MovePointAndTangent(U: Quantity_AbsorbedDose, P: gp_Pnt2d, Tangent: gp_Vec2d, Tolerance: Quantity_AbsorbedDose, StartingCondition: Graphic3d_ZLayerId, EndingCondition: Graphic3d_ZLayerId, ErrorStatus: Graphic3d_ZLayerId): void;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsG1(theTf: Quantity_AbsorbedDose, theTl: Quantity_AbsorbedDose, theAngTol: Quantity_AbsorbedDose): Standard_Boolean;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Graphic3d_ZLayerId;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  LocalValue(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId): gp_Pnt2d;
  LocalD0(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt2d): void;
  LocalD1(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt2d, V1: gp_Vec2d): void;
  LocalD2(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  LocalD3(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  LocalDN(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, N: Graphic3d_ZLayerId): gp_Vec2d;
  EndPoint(): gp_Pnt2d;
  FirstUKnotIndex(): Graphic3d_ZLayerId;
  FirstParameter(): Quantity_AbsorbedDose;
  Knot(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Knots_1(K: TColStd_Array1OfReal): void;
  Knots_2(): TColStd_Array1OfReal;
  KnotSequence_1(K: TColStd_Array1OfReal): void;
  KnotSequence_2(): TColStd_Array1OfReal;
  KnotDistribution(): GeomAbs_BSplKnotDistribution;
  LastUKnotIndex(): Graphic3d_ZLayerId;
  LastParameter(): Quantity_AbsorbedDose;
  LocateU(U: Quantity_AbsorbedDose, ParametricTolerance: Quantity_AbsorbedDose, I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, WithKnotRepetition: Standard_Boolean): void;
  Multiplicity(Index: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Multiplicities_1(M: TColStd_Array1OfInteger): void;
  Multiplicities_2(): TColStd_Array1OfInteger;
  NbKnots(): Graphic3d_ZLayerId;
  NbPoles(): Graphic3d_ZLayerId;
  Pole(Index: Graphic3d_ZLayerId): gp_Pnt2d;
  Poles_1(P: TColgp_Array1OfPnt2d): void;
  Poles_2(): TColgp_Array1OfPnt2d;
  StartPoint(): gp_Pnt2d;
  Weight(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf2d): void;
  static MaxDegree(): Graphic3d_ZLayerId;
  Resolution(ToleranceUV: Quantity_AbsorbedDose, UTolerance: Quantity_AbsorbedDose): void;
  Copy(): Handle_Geom2d_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom2d_BSplineCurve_1 extends Geom2d_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt2d, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Graphic3d_ZLayerId, Periodic: Standard_Boolean);
  }

  export declare class Geom2d_BSplineCurve_2 extends Geom2d_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt2d, Weights: TColStd_Array1OfReal, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Graphic3d_ZLayerId, Periodic: Standard_Boolean);
  }

export declare type TopAbs_Orientation = {
  TopAbs_FORWARD: {};
  TopAbs_REVERSED: {};
  TopAbs_INTERNAL: {};
  TopAbs_EXTERNAL: {};
}

export declare type TopAbs_ShapeEnum = {
  TopAbs_COMPOUND: {};
  TopAbs_COMPSOLID: {};
  TopAbs_SOLID: {};
  TopAbs_SHELL: {};
  TopAbs_FACE: {};
  TopAbs_WIRE: {};
  TopAbs_EDGE: {};
  TopAbs_VERTEX: {};
  TopAbs_SHAPE: {};
}

export declare class GC_MakeArcOfCircle extends GC_Root {
  Value(): Handle_Geom_TrimmedCurve;
  delete(): void;
}

  export declare class GC_MakeArcOfCircle_1 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, Alpha1: Quantity_AbsorbedDose, Alpha2: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfCircle_2 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, P: gp_Pnt, Alpha: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfCircle_3 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, P1: gp_Pnt, P2: gp_Pnt, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfCircle_4 extends GC_MakeArcOfCircle {
    constructor(P1: gp_Pnt, P2: gp_Pnt, P3: gp_Pnt);
  }

  export declare class GC_MakeArcOfCircle_5 extends GC_MakeArcOfCircle {
    constructor(P1: gp_Pnt, V: gp_Vec, P2: gp_Pnt);
  }

export declare class GC_MakeArcOfEllipse extends GC_Root {
  Value(): Handle_Geom_TrimmedCurve;
  delete(): void;
}

  export declare class GC_MakeArcOfEllipse_1 extends GC_MakeArcOfEllipse {
    constructor(Elips: gp_Elips, Alpha1: Quantity_AbsorbedDose, Alpha2: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfEllipse_2 extends GC_MakeArcOfEllipse {
    constructor(Elips: gp_Elips, P: gp_Pnt, Alpha: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfEllipse_3 extends GC_MakeArcOfEllipse {
    constructor(Elips: gp_Elips, P1: gp_Pnt, P2: gp_Pnt, Sense: Standard_Boolean);
  }

export declare class GC_Root {
  constructor();
  IsDone(): Standard_Boolean;
  Status(): gce_ErrorType;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeOffsetShape extends BRepBuilderAPI_MakeShape {
  PerformBySimple(theS: TopoDS_Shape, theOffsetValue: Quantity_AbsorbedDose): void;
  PerformByJoin(S: TopoDS_Shape, Offset: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, Mode: BRepOffset_Mode, Intersection: Standard_Boolean, SelfInter: Standard_Boolean, Join: GeomAbs_JoinType, RemoveIntEdges: Standard_Boolean): void;
  MakeOffset(): BRepOffset_MakeOffset;
  Build(): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  GetJoinType(): GeomAbs_JoinType;
  delete(): void;
}

  export declare class BRepOffsetAPI_MakeOffsetShape_1 extends BRepOffsetAPI_MakeOffsetShape {
    constructor();
  }

  export declare class BRepOffsetAPI_MakeOffsetShape_2 extends BRepOffsetAPI_MakeOffsetShape {
    constructor(S: TopoDS_Shape, Offset: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, Mode: BRepOffset_Mode, Intersection: Standard_Boolean, SelfInter: Standard_Boolean, Join: GeomAbs_JoinType, RemoveIntEdges: Standard_Boolean);
  }

export declare class BRepOffsetAPI_MakeFilling extends BRepBuilderAPI_MakeShape {
  constructor(Degree: Graphic3d_ZLayerId, NbPtsOnCur: Graphic3d_ZLayerId, NbIter: Graphic3d_ZLayerId, Anisotropie: Standard_Boolean, Tol2d: Quantity_AbsorbedDose, Tol3d: Quantity_AbsorbedDose, TolAng: Quantity_AbsorbedDose, TolCurv: Quantity_AbsorbedDose, MaxDeg: Graphic3d_ZLayerId, MaxSegments: Graphic3d_ZLayerId)
  SetConstrParam(Tol2d: Quantity_AbsorbedDose, Tol3d: Quantity_AbsorbedDose, TolAng: Quantity_AbsorbedDose, TolCurv: Quantity_AbsorbedDose): void;
  SetResolParam(Degree: Graphic3d_ZLayerId, NbPtsOnCur: Graphic3d_ZLayerId, NbIter: Graphic3d_ZLayerId, Anisotropie: Standard_Boolean): void;
  SetApproxParam(MaxDeg: Graphic3d_ZLayerId, MaxSegments: Graphic3d_ZLayerId): void;
  LoadInitSurface(Surf: TopoDS_Face): void;
  Add_1(Constr: TopoDS_Edge, Order: GeomAbs_Shape, IsBound: Standard_Boolean): Graphic3d_ZLayerId;
  Add_2(Constr: TopoDS_Edge, Support: TopoDS_Face, Order: GeomAbs_Shape, IsBound: Standard_Boolean): Graphic3d_ZLayerId;
  Add_3(Support: TopoDS_Face, Order: GeomAbs_Shape): Graphic3d_ZLayerId;
  Add_4(Point: gp_Pnt): Graphic3d_ZLayerId;
  Add_5(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Support: TopoDS_Face, Order: GeomAbs_Shape): Graphic3d_ZLayerId;
  Build(): void;
  IsDone(): Standard_Boolean;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  G0Error_1(): Quantity_AbsorbedDose;
  G1Error_1(): Quantity_AbsorbedDose;
  G2Error_1(): Quantity_AbsorbedDose;
  G0Error_2(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  G1Error_2(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  G2Error_2(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  delete(): void;
}

export declare class BRepOffsetAPI_MakePipeShell extends BRepPrimAPI_MakeSweep {
  constructor(Spine: TopoDS_Wire)
  SetMode_1(IsFrenet: Standard_Boolean): void;
  SetDiscreteMode(): void;
  SetMode_2(Axe: gp_Ax2): void;
  SetMode_3(BiNormal: gp_Dir): void;
  SetMode_4(SpineSupport: TopoDS_Shape): Standard_Boolean;
  SetMode_5(AuxiliarySpine: TopoDS_Wire, CurvilinearEquivalence: Standard_Boolean, KeepContact: BRepFill_TypeOfContact): void;
  Add_1(Profile: TopoDS_Shape, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  Add_2(Profile: TopoDS_Shape, Location: TopoDS_Vertex, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  SetLaw_1(Profile: TopoDS_Shape, L: Handle_Law_Function, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  SetLaw_2(Profile: TopoDS_Shape, L: Handle_Law_Function, Location: TopoDS_Vertex, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  Delete(Profile: TopoDS_Shape): void;
  IsReady(): Standard_Boolean;
  GetStatus(): BRepBuilderAPI_PipeError;
  SetTolerance(Tol3d: Quantity_AbsorbedDose, BoundTol: Quantity_AbsorbedDose, TolAngular: Quantity_AbsorbedDose): void;
  SetMaxDegree(NewMaxDegree: Graphic3d_ZLayerId): void;
  SetMaxSegments(NewMaxSegments: Graphic3d_ZLayerId): void;
  SetForceApproxC1(ForceApproxC1: Standard_Boolean): void;
  SetTransitionMode(Mode: BRepBuilderAPI_TransitionMode): void;
  Simulate(NumberOfSection: Graphic3d_ZLayerId, Result: TopTools_ListOfShape): void;
  Build(): void;
  MakeSolid(): Standard_Boolean;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  ErrorOnSurface(): Quantity_AbsorbedDose;
  Profiles(theProfiles: TopTools_ListOfShape): void;
  Spine(): TopoDS_Wire;
  delete(): void;
}

export declare class BRepOffsetAPI_ThruSections extends BRepBuilderAPI_MakeShape {
  constructor(isSolid: Standard_Boolean, ruled: Standard_Boolean, pres3d: Quantity_AbsorbedDose)
  Init(isSolid: Standard_Boolean, ruled: Standard_Boolean, pres3d: Quantity_AbsorbedDose): void;
  AddWire(wire: TopoDS_Wire): void;
  AddVertex(aVertex: TopoDS_Vertex): void;
  CheckCompatibility(check: Standard_Boolean): void;
  SetSmoothing(UseSmoothing: Standard_Boolean): void;
  SetParType(ParType: Approx_ParametrizationType): void;
  SetContinuity(C: GeomAbs_Shape): void;
  SetCriteriumWeight(W1: Quantity_AbsorbedDose, W2: Quantity_AbsorbedDose, W3: Quantity_AbsorbedDose): void;
  SetMaxDegree(MaxDeg: Graphic3d_ZLayerId): void;
  ParType(): Approx_ParametrizationType;
  Continuity(): GeomAbs_Shape;
  MaxDegree(): Graphic3d_ZLayerId;
  UseSmoothing(): Standard_Boolean;
  CriteriumWeight(W1: Quantity_AbsorbedDose, W2: Quantity_AbsorbedDose, W3: Quantity_AbsorbedDose): void;
  Build(): void;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  GeneratedFace(Edge: TopoDS_Shape): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Wires(): TopTools_ListOfShape;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeThickSolid extends BRepOffsetAPI_MakeOffsetShape {
  MakeThickSolidBySimple(theS: TopoDS_Shape, theOffsetValue: Quantity_AbsorbedDose): void;
  MakeThickSolidByJoin(S: TopoDS_Shape, ClosingFaces: TopTools_ListOfShape, Offset: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, Mode: BRepOffset_Mode, Intersection: Standard_Boolean, SelfInter: Standard_Boolean, Join: GeomAbs_JoinType, RemoveIntEdges: Standard_Boolean): void;
  Build(): void;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepOffsetAPI_MakeThickSolid_1 extends BRepOffsetAPI_MakeThickSolid {
    constructor();
  }

  export declare class BRepOffsetAPI_MakeThickSolid_2 extends BRepOffsetAPI_MakeThickSolid {
    constructor(S: TopoDS_Shape, ClosingFaces: TopTools_ListOfShape, Offset: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, Mode: BRepOffset_Mode, Intersection: Standard_Boolean, SelfInter: Standard_Boolean, Join: GeomAbs_JoinType, RemoveIntEdges: Standard_Boolean);
  }

export declare class BRepOffsetAPI_MakeOffset extends BRepBuilderAPI_MakeShape {
  Init_1(Spine: TopoDS_Face, Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean): void;
  Init_2(Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean): void;
  AddWire(Spine: TopoDS_Wire): void;
  Perform(Offset: Quantity_AbsorbedDose, Alt: Quantity_AbsorbedDose): void;
  Build(): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepOffsetAPI_MakeOffset_1 extends BRepOffsetAPI_MakeOffset {
    constructor();
  }

  export declare class BRepOffsetAPI_MakeOffset_2 extends BRepOffsetAPI_MakeOffset {
    constructor(Spine: TopoDS_Face, Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean);
  }

  export declare class BRepOffsetAPI_MakeOffset_3 extends BRepOffsetAPI_MakeOffset {
    constructor(Spine: TopoDS_Wire, Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean);
  }

export declare class BRepOffsetAPI_MakePipe extends BRepPrimAPI_MakeSweep {
  Pipe(): BRepFill_Pipe;
  Build(): void;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  Generated_1(S: TopoDS_Shape): TopTools_ListOfShape;
  Generated_2(SSpine: TopoDS_Shape, SProfile: TopoDS_Shape): TopoDS_Shape;
  ErrorOnSurface(): Quantity_AbsorbedDose;
  delete(): void;
}

  export declare class BRepOffsetAPI_MakePipe_1 extends BRepOffsetAPI_MakePipe {
    constructor(Spine: TopoDS_Wire, Profile: TopoDS_Shape);
  }

  export declare class BRepOffsetAPI_MakePipe_2 extends BRepOffsetAPI_MakePipe {
    constructor(Spine: TopoDS_Wire, Profile: TopoDS_Shape, aMode: GeomFill_Trihedron, ForceApproxC1: Standard_Boolean);
  }

export declare class GeomAPI_Interpolate {
  Load_1(InitialTangent: gp_Vec, FinalTangent: gp_Vec, Scale: Standard_Boolean): void;
  Load_2(Tangents: TColgp_Array1OfVec, TangentFlags: Handle_TColStd_HArray1OfBoolean, Scale: Standard_Boolean): void;
  Perform(): void;
  Curve(): Handle_Geom_BSplineCurve;
  IsDone(): Standard_Boolean;
  delete(): void;
}

  export declare class GeomAPI_Interpolate_1 extends GeomAPI_Interpolate {
    constructor(Points: Handle_TColgp_HArray1OfPnt, PeriodicFlag: Standard_Boolean, Tolerance: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_Interpolate_2 extends GeomAPI_Interpolate {
    constructor(Points: Handle_TColgp_HArray1OfPnt, Parameters: Handle_TColStd_HArray1OfReal, PeriodicFlag: Standard_Boolean, Tolerance: Quantity_AbsorbedDose);
  }

export declare class GeomAPI_ProjectPointOnSurf {
  Init_1(P: gp_Pnt, Surface: Handle_Geom_Surface, Tolerance: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo): void;
  Init_2(P: gp_Pnt, Surface: Handle_Geom_Surface, Algo: Extrema_ExtAlgo): void;
  Init_3(P: gp_Pnt, Surface: Handle_Geom_Surface, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose, Vmin: Quantity_AbsorbedDose, Vsup: Quantity_AbsorbedDose, Tolerance: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo): void;
  Init_4(P: gp_Pnt, Surface: Handle_Geom_Surface, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose, Vmin: Quantity_AbsorbedDose, Vsup: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo): void;
  Init_5(Surface: Handle_Geom_Surface, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose, Vmin: Quantity_AbsorbedDose, Vsup: Quantity_AbsorbedDose, Tolerance: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo): void;
  Init_6(Surface: Handle_Geom_Surface, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose, Vmin: Quantity_AbsorbedDose, Vsup: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo): void;
  SetExtremaAlgo(theAlgo: Extrema_ExtAlgo): void;
  SetExtremaFlag(theExtFlag: Extrema_ExtFlag): void;
  Perform(P: gp_Pnt): void;
  IsDone(): Standard_Boolean;
  NbPoints(): Graphic3d_ZLayerId;
  Point(Index: Graphic3d_ZLayerId): gp_Pnt;
  Parameters(Index: Graphic3d_ZLayerId, U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose): void;
  Distance(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  NearestPoint(): gp_Pnt;
  LowerDistanceParameters(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose): void;
  LowerDistance(): Quantity_AbsorbedDose;
  Extrema(): Extrema_ExtPS;
  delete(): void;
}

  export declare class GeomAPI_ProjectPointOnSurf_1 extends GeomAPI_ProjectPointOnSurf {
    constructor();
  }

  export declare class GeomAPI_ProjectPointOnSurf_2 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Handle_Geom_Surface, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_3 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Handle_Geom_Surface, Tolerance: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_4 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Handle_Geom_Surface, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose, Vmin: Quantity_AbsorbedDose, Vsup: Quantity_AbsorbedDose, Tolerance: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_5 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Handle_Geom_Surface, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose, Vmin: Quantity_AbsorbedDose, Vsup: Quantity_AbsorbedDose, Algo: Extrema_ExtAlgo);
  }

export declare class GeomAPI_PointsToBSplineSurface {
  Init_1(Points: TColgp_Array2OfPnt, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Interpolate_1(Points: TColgp_Array2OfPnt, thePeriodic: Standard_Boolean): void;
  Interpolate_2(Points: TColgp_Array2OfPnt, ParType: Approx_ParametrizationType, thePeriodic: Standard_Boolean): void;
  Init_2(ZPoints: TColStd_Array2OfReal, X0: Quantity_AbsorbedDose, dX: Quantity_AbsorbedDose, Y0: Quantity_AbsorbedDose, dY: Quantity_AbsorbedDose, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Interpolate_3(ZPoints: TColStd_Array2OfReal, X0: Quantity_AbsorbedDose, dX: Quantity_AbsorbedDose, Y0: Quantity_AbsorbedDose, dY: Quantity_AbsorbedDose): void;
  Init_3(Points: TColgp_Array2OfPnt, ParType: Approx_ParametrizationType, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose, thePeriodic: Standard_Boolean): void;
  Init_4(Points: TColgp_Array2OfPnt, Weight1: Quantity_AbsorbedDose, Weight2: Quantity_AbsorbedDose, Weight3: Quantity_AbsorbedDose, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Surface(): Handle_Geom_BSplineSurface;
  IsDone(): Standard_Boolean;
  delete(): void;
}

  export declare class GeomAPI_PointsToBSplineSurface_1 extends GeomAPI_PointsToBSplineSurface {
    constructor();
  }

  export declare class GeomAPI_PointsToBSplineSurface_2 extends GeomAPI_PointsToBSplineSurface {
    constructor(Points: TColgp_Array2OfPnt, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_PointsToBSplineSurface_3 extends GeomAPI_PointsToBSplineSurface {
    constructor(Points: TColgp_Array2OfPnt, ParType: Approx_ParametrizationType, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_PointsToBSplineSurface_4 extends GeomAPI_PointsToBSplineSurface {
    constructor(Points: TColgp_Array2OfPnt, Weight1: Quantity_AbsorbedDose, Weight2: Quantity_AbsorbedDose, Weight3: Quantity_AbsorbedDose, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_PointsToBSplineSurface_5 extends GeomAPI_PointsToBSplineSurface {
    constructor(ZPoints: TColStd_Array2OfReal, X0: Quantity_AbsorbedDose, dX: Quantity_AbsorbedDose, Y0: Quantity_AbsorbedDose, dY: Quantity_AbsorbedDose, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

export declare class GeomAPI_PointsToBSpline {
  Init_1(Points: TColgp_Array1OfPnt, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Init_2(Points: TColgp_Array1OfPnt, ParType: Approx_ParametrizationType, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Init_3(Points: TColgp_Array1OfPnt, Parameters: TColStd_Array1OfReal, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Init_4(Points: TColgp_Array1OfPnt, Weight1: Quantity_AbsorbedDose, Weight2: Quantity_AbsorbedDose, Weight3: Quantity_AbsorbedDose, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose): void;
  Curve(): Handle_Geom_BSplineCurve;
  IsDone(): Standard_Boolean;
  delete(): void;
}

  export declare class GeomAPI_PointsToBSpline_1 extends GeomAPI_PointsToBSpline {
    constructor();
  }

  export declare class GeomAPI_PointsToBSpline_2 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_PointsToBSpline_3 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, ParType: Approx_ParametrizationType, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_PointsToBSpline_4 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, Parameters: TColStd_Array1OfReal, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

  export declare class GeomAPI_PointsToBSpline_5 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, Weight1: Quantity_AbsorbedDose, Weight2: Quantity_AbsorbedDose, Weight3: Quantity_AbsorbedDose, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

export declare class BRepCheck_Analyzer {
  constructor(S: TopoDS_Shape, GeomControls: Standard_Boolean)
  Init(S: TopoDS_Shape, GeomControls: Standard_Boolean): void;
  IsValid_1(S: TopoDS_Shape): Standard_Boolean;
  IsValid_2(): Standard_Boolean;
  Result(SubS: TopoDS_Shape): Handle_BRepCheck_Result;
  delete(): void;
}

export declare class ShapeFix_Face extends ShapeFix_Root {
  ClearModes(): void;
  Init_1(face: TopoDS_Face): void;
  Init_2(surf: Handle_Geom_Surface, preci: Quantity_AbsorbedDose, fwd: Standard_Boolean): void;
  Init_3(surf: Handle_ShapeAnalysis_Surface, preci: Quantity_AbsorbedDose, fwd: Standard_Boolean): void;
  SetMsgRegistrator(msgreg: Handle_ShapeExtend_BasicMsgRegistrator): void;
  SetPrecision(preci: Quantity_AbsorbedDose): void;
  SetMinTolerance(mintol: Quantity_AbsorbedDose): void;
  SetMaxTolerance(maxtol: Quantity_AbsorbedDose): void;
  FixWireMode(): Graphic3d_ZLayerId;
  FixOrientationMode(): Graphic3d_ZLayerId;
  FixAddNaturalBoundMode(): Graphic3d_ZLayerId;
  FixMissingSeamMode(): Graphic3d_ZLayerId;
  FixSmallAreaWireMode(): Graphic3d_ZLayerId;
  RemoveSmallAreaFaceMode(): Graphic3d_ZLayerId;
  FixIntersectingWiresMode(): Graphic3d_ZLayerId;
  FixLoopWiresMode(): Graphic3d_ZLayerId;
  FixSplitFaceMode(): Graphic3d_ZLayerId;
  AutoCorrectPrecisionMode(): Graphic3d_ZLayerId;
  FixPeriodicDegeneratedMode(): Graphic3d_ZLayerId;
  Face(): TopoDS_Face;
  Result(): TopoDS_Shape;
  Add(wire: TopoDS_Wire): void;
  Perform(): Standard_Boolean;
  FixOrientation_1(): Standard_Boolean;
  FixOrientation_2(MapWires: TopTools_DataMapOfShapeListOfShape): Standard_Boolean;
  FixAddNaturalBound(): Standard_Boolean;
  FixMissingSeam(): Standard_Boolean;
  FixSmallAreaWire(theIsRemoveSmallFace: Standard_Boolean): Standard_Boolean;
  FixLoopWire(aResWires: TopTools_SequenceOfShape): Standard_Boolean;
  FixIntersectingWires(): Standard_Boolean;
  FixWiresTwoCoincEdges(): Standard_Boolean;
  FixSplitFace(MapWires: TopTools_DataMapOfShapeListOfShape): Standard_Boolean;
  FixPeriodicDegenerated(): Standard_Boolean;
  Status(status: ShapeExtend_Status): Standard_Boolean;
  FixWireTool(): Handle_ShapeFix_Wire;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class ShapeFix_Face_1 extends ShapeFix_Face {
    constructor();
  }

  export declare class ShapeFix_Face_2 extends ShapeFix_Face {
    constructor(face: TopoDS_Face);
  }

export declare class ShapeFix_Solid extends ShapeFix_Root {
  Init(solid: TopoDS_Solid): void;
  Perform(theProgress: Message_ProgressRange): Standard_Boolean;
  SolidFromShell(shell: TopoDS_Shell): TopoDS_Solid;
  Status(status: ShapeExtend_Status): Standard_Boolean;
  Solid(): TopoDS_Shape;
  FixShellTool(): Handle_ShapeFix_Shell;
  SetMsgRegistrator(msgreg: Handle_ShapeExtend_BasicMsgRegistrator): void;
  SetPrecision(preci: Quantity_AbsorbedDose): void;
  SetMinTolerance(mintol: Quantity_AbsorbedDose): void;
  SetMaxTolerance(maxtol: Quantity_AbsorbedDose): void;
  FixShellMode(): Graphic3d_ZLayerId;
  FixShellOrientationMode(): Graphic3d_ZLayerId;
  CreateOpenSolidMode(): Standard_Boolean;
  Shape(): TopoDS_Shape;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class ShapeFix_Solid_1 extends ShapeFix_Solid {
    constructor();
  }

  export declare class ShapeFix_Solid_2 extends ShapeFix_Solid {
    constructor(solid: TopoDS_Solid);
  }

export declare class ShapeFix_Root extends Standard_Transient {
  constructor()
  Set(Root: Handle_ShapeFix_Root): void;
  SetContext(context: Handle_ShapeBuild_ReShape): void;
  Context(): Handle_ShapeBuild_ReShape;
  SetMsgRegistrator(msgreg: Handle_ShapeExtend_BasicMsgRegistrator): void;
  MsgRegistrator(): Handle_ShapeExtend_BasicMsgRegistrator;
  SetPrecision(preci: Quantity_AbsorbedDose): void;
  Precision(): Quantity_AbsorbedDose;
  SetMinTolerance(mintol: Quantity_AbsorbedDose): void;
  MinTolerance(): Quantity_AbsorbedDose;
  SetMaxTolerance(maxtol: Quantity_AbsorbedDose): void;
  MaxTolerance(): Quantity_AbsorbedDose;
  LimitTolerance(toler: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  SendMsg_1(shape: TopoDS_Shape, message: Message_Msg, gravity: Message_Gravity): void;
  SendMsg_2(message: Message_Msg, gravity: Message_Gravity): void;
  SendWarning_1(shape: TopoDS_Shape, message: Message_Msg): void;
  SendWarning_2(message: Message_Msg): void;
  SendFail_1(shape: TopoDS_Shape, message: Message_Msg): void;
  SendFail_2(message: Message_Msg): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class ShapeFix_Wire extends ShapeFix_Root {
  ClearModes(): void;
  ClearStatuses(): void;
  Init_1(wire: TopoDS_Wire, face: TopoDS_Face, prec: Quantity_AbsorbedDose): void;
  Init_2(saw: Handle_ShapeAnalysis_Wire): void;
  Load_1(wire: TopoDS_Wire): void;
  Load_2(sbwd: Handle_ShapeExtend_WireData): void;
  SetFace(face: TopoDS_Face): void;
  SetSurface_1(surf: Handle_Geom_Surface): void;
  SetSurface_2(surf: Handle_Geom_Surface, loc: TopLoc_Location): void;
  SetPrecision(prec: Quantity_AbsorbedDose): void;
  SetMaxTailAngle(theMaxTailAngle: Quantity_AbsorbedDose): void;
  SetMaxTailWidth(theMaxTailWidth: Quantity_AbsorbedDose): void;
  IsLoaded(): Standard_Boolean;
  IsReady(): Standard_Boolean;
  NbEdges(): Graphic3d_ZLayerId;
  Wire(): TopoDS_Wire;
  WireAPIMake(): TopoDS_Wire;
  Analyzer(): Handle_ShapeAnalysis_Wire;
  WireData(): Handle_ShapeExtend_WireData;
  Face(): TopoDS_Face;
  ModifyTopologyMode(): Standard_Boolean;
  ModifyGeometryMode(): Standard_Boolean;
  ModifyRemoveLoopMode(): Graphic3d_ZLayerId;
  ClosedWireMode(): Standard_Boolean;
  PreferencePCurveMode(): Standard_Boolean;
  FixGapsByRangesMode(): Standard_Boolean;
  FixReorderMode(): Graphic3d_ZLayerId;
  FixSmallMode(): Graphic3d_ZLayerId;
  FixConnectedMode(): Graphic3d_ZLayerId;
  FixEdgeCurvesMode(): Graphic3d_ZLayerId;
  FixDegeneratedMode(): Graphic3d_ZLayerId;
  FixSelfIntersectionMode(): Graphic3d_ZLayerId;
  FixLackingMode(): Graphic3d_ZLayerId;
  FixGaps3dMode(): Graphic3d_ZLayerId;
  FixGaps2dMode(): Graphic3d_ZLayerId;
  FixReversed2dMode(): Graphic3d_ZLayerId;
  FixRemovePCurveMode(): Graphic3d_ZLayerId;
  FixAddPCurveMode(): Graphic3d_ZLayerId;
  FixRemoveCurve3dMode(): Graphic3d_ZLayerId;
  FixAddCurve3dMode(): Graphic3d_ZLayerId;
  FixSeamMode(): Graphic3d_ZLayerId;
  FixShiftedMode(): Graphic3d_ZLayerId;
  FixSameParameterMode(): Graphic3d_ZLayerId;
  FixVertexToleranceMode(): Graphic3d_ZLayerId;
  FixNotchedEdgesMode(): Graphic3d_ZLayerId;
  FixSelfIntersectingEdgeMode(): Graphic3d_ZLayerId;
  FixIntersectingEdgesMode(): Graphic3d_ZLayerId;
  FixNonAdjacentIntersectingEdgesMode(): Graphic3d_ZLayerId;
  FixTailMode(): Graphic3d_ZLayerId;
  Perform(): Standard_Boolean;
  FixReorder_1(): Standard_Boolean;
  FixSmall_1(lockvtx: Standard_Boolean, precsmall: Quantity_AbsorbedDose): Graphic3d_ZLayerId;
  FixConnected_1(prec: Quantity_AbsorbedDose): Standard_Boolean;
  FixEdgeCurves(): Standard_Boolean;
  FixDegenerated_1(): Standard_Boolean;
  FixSelfIntersection(): Standard_Boolean;
  FixLacking_1(force: Standard_Boolean): Standard_Boolean;
  FixClosed(prec: Quantity_AbsorbedDose): Standard_Boolean;
  FixGaps3d(): Standard_Boolean;
  FixGaps2d(): Standard_Boolean;
  FixReorder_2(wi: ShapeAnalysis_WireOrder): Standard_Boolean;
  FixSmall_2(num: Graphic3d_ZLayerId, lockvtx: Standard_Boolean, precsmall: Quantity_AbsorbedDose): Standard_Boolean;
  FixConnected_2(num: Graphic3d_ZLayerId, prec: Quantity_AbsorbedDose): Standard_Boolean;
  FixSeam(num: Graphic3d_ZLayerId): Standard_Boolean;
  FixShifted(): Standard_Boolean;
  FixDegenerated_2(num: Graphic3d_ZLayerId): Standard_Boolean;
  FixLacking_2(num: Graphic3d_ZLayerId, force: Standard_Boolean): Standard_Boolean;
  FixNotchedEdges(): Standard_Boolean;
  FixGap3d(num: Graphic3d_ZLayerId, convert: Standard_Boolean): Standard_Boolean;
  FixGap2d(num: Graphic3d_ZLayerId, convert: Standard_Boolean): Standard_Boolean;
  FixTails(): Standard_Boolean;
  StatusReorder(status: ShapeExtend_Status): Standard_Boolean;
  StatusSmall(status: ShapeExtend_Status): Standard_Boolean;
  StatusConnected(status: ShapeExtend_Status): Standard_Boolean;
  StatusEdgeCurves(status: ShapeExtend_Status): Standard_Boolean;
  StatusDegenerated(status: ShapeExtend_Status): Standard_Boolean;
  StatusSelfIntersection(status: ShapeExtend_Status): Standard_Boolean;
  StatusLacking(status: ShapeExtend_Status): Standard_Boolean;
  StatusClosed(status: ShapeExtend_Status): Standard_Boolean;
  StatusGaps3d(status: ShapeExtend_Status): Standard_Boolean;
  StatusGaps2d(status: ShapeExtend_Status): Standard_Boolean;
  StatusNotches(status: ShapeExtend_Status): Standard_Boolean;
  StatusRemovedSegment(): Standard_Boolean;
  StatusFixTails(status: ShapeExtend_Status): Standard_Boolean;
  LastFixStatus(status: ShapeExtend_Status): Standard_Boolean;
  FixEdgeTool(): Handle_ShapeFix_Edge;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class ShapeFix_Wire_1 extends ShapeFix_Wire {
    constructor();
  }

  export declare class ShapeFix_Wire_2 extends ShapeFix_Wire {
    constructor(wire: TopoDS_Wire, face: TopoDS_Face, prec: Quantity_AbsorbedDose);
  }

export declare class ShapeFix_EdgeConnect {
  constructor()
  Add_1(aFirst: TopoDS_Edge, aSecond: TopoDS_Edge): void;
  Add_2(aShape: TopoDS_Shape): void;
  Build(): void;
  Clear(): void;
  delete(): void;
}

export declare type GeomAbs_Shape = {
  GeomAbs_C0: {};
  GeomAbs_G1: {};
  GeomAbs_C1: {};
  GeomAbs_G2: {};
  GeomAbs_C2: {};
  GeomAbs_C3: {};
  GeomAbs_CN: {};
}

export declare type GeomAbs_SurfaceType = {
  GeomAbs_Plane: {};
  GeomAbs_Cylinder: {};
  GeomAbs_Cone: {};
  GeomAbs_Sphere: {};
  GeomAbs_Torus: {};
  GeomAbs_BezierSurface: {};
  GeomAbs_BSplineSurface: {};
  GeomAbs_SurfaceOfRevolution: {};
  GeomAbs_SurfaceOfExtrusion: {};
  GeomAbs_OffsetSurface: {};
  GeomAbs_OtherSurface: {};
}

export declare type GeomAbs_CurveType = {
  GeomAbs_Line: {};
  GeomAbs_Circle: {};
  GeomAbs_Ellipse: {};
  GeomAbs_Hyperbola: {};
  GeomAbs_Parabola: {};
  GeomAbs_BezierCurve: {};
  GeomAbs_BSplineCurve: {};
  GeomAbs_OffsetCurve: {};
  GeomAbs_OtherCurve: {};
}

export declare type GeomAbs_JoinType = {
  GeomAbs_Arc: {};
  GeomAbs_Tangent: {};
  GeomAbs_Intersection: {};
}

export declare type Convert_ParameterisationType = {
  Convert_TgtThetaOver2: {};
  Convert_TgtThetaOver2_1: {};
  Convert_TgtThetaOver2_2: {};
  Convert_TgtThetaOver2_3: {};
  Convert_TgtThetaOver2_4: {};
  Convert_QuasiAngular: {};
  Convert_RationalC1: {};
  Convert_Polynomial: {};
}

export declare class GCPnts_TangentialDeflection {
  Initialize_1(C: Adaptor3d_Curve, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose): void;
  Initialize_2(C: Adaptor3d_Curve, FirstParameter: Quantity_AbsorbedDose, LastParameter: Quantity_AbsorbedDose, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose): void;
  Initialize_3(C: Adaptor2d_Curve2d, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose): void;
  Initialize_4(C: Adaptor2d_Curve2d, FirstParameter: Quantity_AbsorbedDose, LastParameter: Quantity_AbsorbedDose, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose): void;
  AddPoint(thePnt: gp_Pnt, theParam: Quantity_AbsorbedDose, theIsReplace: Standard_Boolean): Graphic3d_ZLayerId;
  NbPoints(): Graphic3d_ZLayerId;
  Parameter(I: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Value(I: Graphic3d_ZLayerId): gp_Pnt;
  static ArcAngularStep(theRadius: Quantity_AbsorbedDose, theLinearDeflection: Quantity_AbsorbedDose, theAngularDeflection: Quantity_AbsorbedDose, theMinLength: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  delete(): void;
}

  export declare class GCPnts_TangentialDeflection_1 extends GCPnts_TangentialDeflection {
    constructor();
  }

  export declare class GCPnts_TangentialDeflection_2 extends GCPnts_TangentialDeflection {
    constructor(C: Adaptor3d_Curve, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose);
  }

  export declare class GCPnts_TangentialDeflection_3 extends GCPnts_TangentialDeflection {
    constructor(C: Adaptor3d_Curve, FirstParameter: Quantity_AbsorbedDose, LastParameter: Quantity_AbsorbedDose, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose);
  }

  export declare class GCPnts_TangentialDeflection_4 extends GCPnts_TangentialDeflection {
    constructor(C: Adaptor2d_Curve2d, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose);
  }

  export declare class GCPnts_TangentialDeflection_5 extends GCPnts_TangentialDeflection {
    constructor(C: Adaptor2d_Curve2d, FirstParameter: Quantity_AbsorbedDose, LastParameter: Quantity_AbsorbedDose, AngularDeflection: Quantity_AbsorbedDose, CurvatureDeflection: Quantity_AbsorbedDose, MinimumOfPoints: Graphic3d_ZLayerId, UTol: Quantity_AbsorbedDose, theMinLen: Quantity_AbsorbedDose);
  }

export declare class BRepBndLib {
  constructor();
  static Add(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: Standard_Boolean): void;
  static AddClose(S: TopoDS_Shape, B: Bnd_Box): void;
  static AddOptimal(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: Standard_Boolean, useShapeTolerance: Standard_Boolean): void;
  static AddOBB(theS: TopoDS_Shape, theOBB: Bnd_OBB, theIsTriangulationUsed: Standard_Boolean, theIsOptimal: Standard_Boolean, theIsShapeToleranceUsed: Standard_Boolean): void;
  delete(): void;
}

export declare class BndLib_Add2dCurve {
  constructor();
  static Add_1(C: Adaptor2d_Curve2d, Tol: Quantity_AbsorbedDose, B: Bnd_Box2d): void;
  static Add_2(C: Adaptor2d_Curve2d, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, B: Bnd_Box2d): void;
  static Add_3(C: Handle_Geom2d_Curve, Tol: Quantity_AbsorbedDose, Box: Bnd_Box2d): void;
  static Add_4(C: Handle_Geom2d_Curve, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, B: Bnd_Box2d): void;
  static AddOptimal(C: Handle_Geom2d_Curve, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose, B: Bnd_Box2d): void;
  delete(): void;
}

export declare class GCE2d_MakeArcOfCircle extends GCE2d_Root {
  Value(): Handle_Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class GCE2d_MakeArcOfCircle_1 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, Alpha1: Quantity_AbsorbedDose, Alpha2: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_2 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, P: gp_Pnt2d, Alpha: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_3 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, P1: gp_Pnt2d, P2: gp_Pnt2d, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_4 extends GCE2d_MakeArcOfCircle {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d, P3: gp_Pnt2d);
  }

  export declare class GCE2d_MakeArcOfCircle_5 extends GCE2d_MakeArcOfCircle {
    constructor(P1: gp_Pnt2d, V: gp_Vec2d, P2: gp_Pnt2d);
  }

export declare class GCE2d_MakeSegment extends GCE2d_Root {
  Value(): Handle_Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class GCE2d_MakeSegment_1 extends GCE2d_MakeSegment {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

  export declare class GCE2d_MakeSegment_2 extends GCE2d_MakeSegment {
    constructor(P1: gp_Pnt2d, V: gp_Dir2d, P2: gp_Pnt2d);
  }

  export declare class GCE2d_MakeSegment_3 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose);
  }

  export declare class GCE2d_MakeSegment_4 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, Point: gp_Pnt2d, Ulast: Quantity_AbsorbedDose);
  }

  export declare class GCE2d_MakeSegment_5 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

export declare class GCE2d_MakeEllipse extends GCE2d_Root {
  Value(): Handle_Geom2d_Ellipse;
  delete(): void;
}

  export declare class GCE2d_MakeEllipse_1 extends GCE2d_MakeEllipse {
    constructor(E: gp_Elips2d);
  }

  export declare class GCE2d_MakeEllipse_2 extends GCE2d_MakeEllipse {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeEllipse_3 extends GCE2d_MakeEllipse {
    constructor(Axis: gp_Ax22d, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose);
  }

  export declare class GCE2d_MakeEllipse_4 extends GCE2d_MakeEllipse {
    constructor(S1: gp_Pnt2d, S2: gp_Pnt2d, Center: gp_Pnt2d);
  }

export declare class GCE2d_MakeArcOfEllipse extends GCE2d_Root {
  Value(): Handle_Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class GCE2d_MakeArcOfEllipse_1 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, Alpha1: Quantity_AbsorbedDose, Alpha2: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfEllipse_2 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, P: gp_Pnt2d, Alpha: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfEllipse_3 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, P1: gp_Pnt2d, P2: gp_Pnt2d, Sense: Standard_Boolean);
  }

export declare class GCE2d_Root {
  constructor();
  IsDone(): Standard_Boolean;
  Status(): gce_ErrorType;
  delete(): void;
}

export declare class GCE2d_MakeCircle extends GCE2d_Root {
  Value(): Handle_Geom2d_Circle;
  delete(): void;
}

  export declare class GCE2d_MakeCircle_1 extends GCE2d_MakeCircle {
    constructor(C: gp_Circ2d);
  }

  export declare class GCE2d_MakeCircle_2 extends GCE2d_MakeCircle {
    constructor(A: gp_Ax2d, Radius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeCircle_3 extends GCE2d_MakeCircle {
    constructor(A: gp_Ax22d, Radius: Quantity_AbsorbedDose);
  }

  export declare class GCE2d_MakeCircle_4 extends GCE2d_MakeCircle {
    constructor(Circ: gp_Circ2d, Dist: Quantity_AbsorbedDose);
  }

  export declare class GCE2d_MakeCircle_5 extends GCE2d_MakeCircle {
    constructor(Circ: gp_Circ2d, Point: gp_Pnt2d);
  }

  export declare class GCE2d_MakeCircle_6 extends GCE2d_MakeCircle {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d, P3: gp_Pnt2d);
  }

  export declare class GCE2d_MakeCircle_7 extends GCE2d_MakeCircle {
    constructor(P: gp_Pnt2d, Radius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeCircle_8 extends GCE2d_MakeCircle {
    constructor(Center: gp_Pnt2d, Point: gp_Pnt2d, Sense: Standard_Boolean);
  }

export declare class GeomLib {
  constructor();
  static To3d(Position: gp_Ax2, Curve2d: Handle_Geom2d_Curve): Handle_Geom_Curve;
  static GTransform(Curve: Handle_Geom2d_Curve, GTrsf: gp_GTrsf2d): Handle_Geom2d_Curve;
  static SameRange(Tolerance: Quantity_AbsorbedDose, Curve2dPtr: Handle_Geom2d_Curve, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, RequestedFirst: Quantity_AbsorbedDose, RequestedLast: Quantity_AbsorbedDose, NewCurve2dPtr: Handle_Geom2d_Curve): void;
  static BuildCurve3d(Tolerance: Quantity_AbsorbedDose, CurvePtr: Adaptor3d_CurveOnSurface, FirstParameter: Quantity_AbsorbedDose, LastParameter: Quantity_AbsorbedDose, NewCurvePtr: Handle_Geom_Curve, MaxDeviation: Quantity_AbsorbedDose, AverageDeviation: Quantity_AbsorbedDose, Continuity: GeomAbs_Shape, MaxDegree: Graphic3d_ZLayerId, MaxSegment: Graphic3d_ZLayerId): void;
  static AdjustExtremity(Curve: Handle_Geom_BoundedCurve, P1: gp_Pnt, P2: gp_Pnt, T1: gp_Vec, T2: gp_Vec): void;
  static ExtendCurveToPoint(Curve: Handle_Geom_BoundedCurve, Point: gp_Pnt, Cont: Graphic3d_ZLayerId, After: Standard_Boolean): void;
  static ExtendSurfByLength(Surf: Handle_Geom_BoundedSurface, Length: Quantity_AbsorbedDose, Cont: Graphic3d_ZLayerId, InU: Standard_Boolean, After: Standard_Boolean): void;
  static AxeOfInertia(Points: TColgp_Array1OfPnt, Axe: gp_Ax2, IsSingular: Standard_Boolean, Tol: Quantity_AbsorbedDose): void;
  static Inertia(Points: TColgp_Array1OfPnt, Bary: gp_Pnt, XDir: gp_Dir, YDir: gp_Dir, Xgap: Quantity_AbsorbedDose, YGap: Quantity_AbsorbedDose, ZGap: Quantity_AbsorbedDose): void;
  static RemovePointsFromArray(NumPoints: Graphic3d_ZLayerId, InParameters: TColStd_Array1OfReal, OutParameters: Handle_TColStd_HArray1OfReal): void;
  static DensifyArray1OfReal(MinNumPoints: Graphic3d_ZLayerId, InParameters: TColStd_Array1OfReal, OutParameters: Handle_TColStd_HArray1OfReal): void;
  static FuseIntervals(Interval1: TColStd_Array1OfReal, Interval2: TColStd_Array1OfReal, Fusion: TColStd_SequenceOfReal, Confusion: Quantity_AbsorbedDose, IsAdjustToFirstInterval: Standard_Boolean): void;
  static EvalMaxParametricDistance(Curve: Adaptor3d_Curve, AReferenceCurve: Adaptor3d_Curve, Tolerance: Quantity_AbsorbedDose, Parameters: TColStd_Array1OfReal, MaxDistance: Quantity_AbsorbedDose): void;
  static EvalMaxDistanceAlongParameter(Curve: Adaptor3d_Curve, AReferenceCurve: Adaptor3d_Curve, Tolerance: Quantity_AbsorbedDose, Parameters: TColStd_Array1OfReal, MaxDistance: Quantity_AbsorbedDose): void;
  static CancelDenominatorDerivative(BSurf: Handle_Geom_BSplineSurface, UDirection: Standard_Boolean, VDirection: Standard_Boolean): void;
  static NormEstim(S: Handle_Geom_Surface, UV: gp_Pnt2d, Tol: Quantity_AbsorbedDose, N: gp_Dir): Graphic3d_ZLayerId;
  static IsClosed(S: Handle_Geom_Surface, Tol: Quantity_AbsorbedDose, isUClosed: Standard_Boolean, isVClosed: Standard_Boolean): void;
  static IsBSplUClosed(S: Handle_Geom_BSplineSurface, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Standard_Boolean;
  static IsBSplVClosed(S: Handle_Geom_BSplineSurface, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Standard_Boolean;
  static IsBzUClosed(S: Handle_Geom_BezierSurface, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Standard_Boolean;
  static IsBzVClosed(S: Handle_Geom_BezierSurface, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Standard_Boolean;
  static isIsoLine(theC2D: Handle_Adaptor2d_HCurve2d, theIsU: Standard_Boolean, theParam: Quantity_AbsorbedDose, theIsForward: Standard_Boolean): Standard_Boolean;
  static buildC3dOnIsoLine(theC2D: Handle_Adaptor2d_HCurve2d, theSurf: Handle_Adaptor3d_HSurface, theFirst: Quantity_AbsorbedDose, theLast: Quantity_AbsorbedDose, theTolerance: Quantity_AbsorbedDose, theIsU: Standard_Boolean, theParam: Quantity_AbsorbedDose, theIsForward: Standard_Boolean): Handle_Geom_Curve;
  delete(): void;
}

export declare class BRepExtrema_DistShapeShape {
  SetDeflection(theDeflection: Quantity_AbsorbedDose): void;
  LoadS1(Shape1: TopoDS_Shape): void;
  LoadS2(Shape1: TopoDS_Shape): void;
  Perform(): Standard_Boolean;
  IsDone(): Standard_Boolean;
  NbSolution(): Graphic3d_ZLayerId;
  Value(): Quantity_AbsorbedDose;
  InnerSolution(): Standard_Boolean;
  PointOnShape1(N: Graphic3d_ZLayerId): gp_Pnt;
  PointOnShape2(N: Graphic3d_ZLayerId): gp_Pnt;
  SupportTypeShape1(N: Graphic3d_ZLayerId): BRepExtrema_SupportType;
  SupportTypeShape2(N: Graphic3d_ZLayerId): BRepExtrema_SupportType;
  SupportOnShape1(N: Graphic3d_ZLayerId): TopoDS_Shape;
  SupportOnShape2(N: Graphic3d_ZLayerId): TopoDS_Shape;
  ParOnEdgeS1(N: Graphic3d_ZLayerId, t: Quantity_AbsorbedDose): void;
  ParOnEdgeS2(N: Graphic3d_ZLayerId, t: Quantity_AbsorbedDose): void;
  ParOnFaceS1(N: Graphic3d_ZLayerId, u: Quantity_AbsorbedDose, v: Quantity_AbsorbedDose): void;
  ParOnFaceS2(N: Graphic3d_ZLayerId, u: Quantity_AbsorbedDose, v: Quantity_AbsorbedDose): void;
  Dump(o: Standard_OStream): void;
  SetFlag(F: Extrema_ExtFlag): void;
  SetAlgo(A: Extrema_ExtAlgo): void;
  delete(): void;
}

  export declare class BRepExtrema_DistShapeShape_1 extends BRepExtrema_DistShapeShape {
    constructor();
  }

  export declare class BRepExtrema_DistShapeShape_2 extends BRepExtrema_DistShapeShape {
    constructor(Shape1: TopoDS_Shape, Shape2: TopoDS_Shape, F: Extrema_ExtFlag, A: Extrema_ExtAlgo);
  }

  export declare class BRepExtrema_DistShapeShape_3 extends BRepExtrema_DistShapeShape {
    constructor(Shape1: TopoDS_Shape, Shape2: TopoDS_Shape, theDeflection: Quantity_AbsorbedDose, F: Extrema_ExtFlag, A: Extrema_ExtAlgo);
  }

export declare class Geom2dAdaptor_Curve extends Adaptor2d_Curve2d {
  Reset(): void;
  Load_1(C: Handle_Geom2d_Curve): void;
  Load_2(C: Handle_Geom2d_Curve, UFirst: Quantity_AbsorbedDose, ULast: Quantity_AbsorbedDose): void;
  Curve(): Handle_Geom2d_Curve;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor2d_HCurve2d;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose): gp_Pnt2d;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Resolution(Ruv: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin2d;
  Circle(): gp_Circ2d;
  Ellipse(): gp_Elips2d;
  Hyperbola(): gp_Hypr2d;
  Parabola(): gp_Parab2d;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  NbSamples(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom2d_BezierCurve;
  BSpline(): Handle_Geom2d_BSplineCurve;
  delete(): void;
}

  export declare class Geom2dAdaptor_Curve_1 extends Geom2dAdaptor_Curve {
    constructor();
  }

  export declare class Geom2dAdaptor_Curve_2 extends Geom2dAdaptor_Curve {
    constructor(C: Handle_Geom2d_Curve);
  }

  export declare class Geom2dAdaptor_Curve_3 extends Geom2dAdaptor_Curve {
    constructor(C: Handle_Geom2d_Curve, UFirst: Quantity_AbsorbedDose, ULast: Quantity_AbsorbedDose);
  }

export declare type ChFiDS_ChamfMode = {
  ChFiDS_ClassicChamfer: {};
  ChFiDS_ConstThroatChamfer: {};
  ChFiDS_ConstThroatWithPenetrationChamfer: {};
}

export declare class Law_S extends Law_BSpFunc {
  constructor()
  Set_1(Pdeb: Quantity_AbsorbedDose, Valdeb: Quantity_AbsorbedDose, Pfin: Quantity_AbsorbedDose, Valfin: Quantity_AbsorbedDose): void;
  Set_2(Pdeb: Quantity_AbsorbedDose, Valdeb: Quantity_AbsorbedDose, Ddeb: Quantity_AbsorbedDose, Pfin: Quantity_AbsorbedDose, Valfin: Quantity_AbsorbedDose, Dfin: Quantity_AbsorbedDose): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Law_Interpol extends Law_BSpFunc {
  constructor()
  Set_1(ParAndRad: TColgp_Array1OfPnt2d, Periodic: Standard_Boolean): void;
  SetInRelative_1(ParAndRad: TColgp_Array1OfPnt2d, Ud: Quantity_AbsorbedDose, Uf: Quantity_AbsorbedDose, Periodic: Standard_Boolean): void;
  Set_2(ParAndRad: TColgp_Array1OfPnt2d, Dd: Quantity_AbsorbedDose, Df: Quantity_AbsorbedDose, Periodic: Standard_Boolean): void;
  SetInRelative_2(ParAndRad: TColgp_Array1OfPnt2d, Ud: Quantity_AbsorbedDose, Uf: Quantity_AbsorbedDose, Dd: Quantity_AbsorbedDose, Df: Quantity_AbsorbedDose, Periodic: Standard_Boolean): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Law_Composite extends Law_Function {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  D1(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  D2(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose, D2: Quantity_AbsorbedDose): void;
  Trim(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Law_Function;
  Bounds(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose): void;
  ChangeElementaryLaw(W: Quantity_AbsorbedDose): Handle_Law_Function;
  ChangeLaws(): Law_Laws;
  IsPeriodic(): Standard_Boolean;
  SetPeriodic(): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Law_Composite_1 extends Law_Composite {
    constructor();
  }

  export declare class Law_Composite_2 extends Law_Composite {
    constructor(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose);
  }

export declare class Law_Function extends Standard_Transient {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  D1(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  D2(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose, D2: Quantity_AbsorbedDose): void;
  Trim(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Law_Function;
  Bounds(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Law_Function {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Law_Function): void;
  get(): Law_Function;
  delete(): void;
}

  export declare class Handle_Law_Function_1 extends Handle_Law_Function {
    constructor();
  }

  export declare class Handle_Law_Function_2 extends Handle_Law_Function {
    constructor(thePtr: Law_Function);
  }

  export declare class Handle_Law_Function_3 extends Handle_Law_Function {
    constructor(theHandle: Handle_Law_Function);
  }

  export declare class Handle_Law_Function_4 extends Handle_Law_Function {
    constructor(theHandle: Handle_Law_Function);
  }

export declare class Law_Linear extends Law_Function {
  constructor()
  Set(Pdeb: Quantity_AbsorbedDose, Valdeb: Quantity_AbsorbedDose, Pfin: Quantity_AbsorbedDose, Valfin: Quantity_AbsorbedDose): void;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  D1(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  D2(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose, D2: Quantity_AbsorbedDose): void;
  Trim(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Law_Function;
  Bounds(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Law_BSpFunc extends Law_Function {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  D1(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  D2(X: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose, D2: Quantity_AbsorbedDose): void;
  Trim(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Law_Function;
  Bounds(PFirst: Quantity_AbsorbedDose, PLast: Quantity_AbsorbedDose): void;
  Curve(): Handle_Law_BSpline;
  SetCurve(C: Handle_Law_BSpline): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Law_BSpFunc_1 extends Law_BSpFunc {
    constructor();
  }

  export declare class Law_BSpFunc_2 extends Law_BSpFunc {
    constructor(C: Handle_Law_BSpline, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose);
  }

export declare class BRep_Tool {
  constructor();
  static IsClosed_1(S: TopoDS_Shape): Standard_Boolean;
  static Surface_1(F: TopoDS_Face, L: TopLoc_Location): Handle_Geom_Surface;
  static Surface_2(F: TopoDS_Face): Handle_Geom_Surface;
  static Triangulation(F: TopoDS_Face, L: TopLoc_Location): Handle_Poly_Triangulation;
  static Tolerance_1(F: TopoDS_Face): Quantity_AbsorbedDose;
  static NaturalRestriction(F: TopoDS_Face): Standard_Boolean;
  static IsGeometric_1(F: TopoDS_Face): Standard_Boolean;
  static IsGeometric_2(E: TopoDS_Edge): Standard_Boolean;
  static Curve_1(E: TopoDS_Edge, L: TopLoc_Location, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): Handle_Geom_Curve;
  static Curve_2(E: TopoDS_Edge, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): Handle_Geom_Curve;
  static Polygon3D(E: TopoDS_Edge, L: TopLoc_Location): Handle_Poly_Polygon3D;
  static CurveOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, theIsStored: Standard_Boolean): Handle_Geom2d_Curve;
  static CurveOnSurface_2(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, theIsStored: Standard_Boolean): Handle_Geom2d_Curve;
  static CurveOnPlane(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): Handle_Geom2d_Curve;
  static CurveOnSurface_3(E: TopoDS_Edge, C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, L: TopLoc_Location, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): void;
  static CurveOnSurface_4(E: TopoDS_Edge, C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, L: TopLoc_Location, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Index: Graphic3d_ZLayerId): void;
  static PolygonOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face): Handle_Poly_Polygon2D;
  static PolygonOnSurface_2(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location): Handle_Poly_Polygon2D;
  static PolygonOnSurface_3(E: TopoDS_Edge, C: Handle_Poly_Polygon2D, S: Handle_Geom_Surface, L: TopLoc_Location): void;
  static PolygonOnSurface_4(E: TopoDS_Edge, C: Handle_Poly_Polygon2D, S: Handle_Geom_Surface, L: TopLoc_Location, Index: Graphic3d_ZLayerId): void;
  static PolygonOnTriangulation_1(E: TopoDS_Edge, T: Handle_Poly_Triangulation, L: TopLoc_Location): Handle_Poly_PolygonOnTriangulation;
  static PolygonOnTriangulation_2(E: TopoDS_Edge, P: Handle_Poly_PolygonOnTriangulation, T: Handle_Poly_Triangulation, L: TopLoc_Location): void;
  static PolygonOnTriangulation_3(E: TopoDS_Edge, P: Handle_Poly_PolygonOnTriangulation, T: Handle_Poly_Triangulation, L: TopLoc_Location, Index: Graphic3d_ZLayerId): void;
  static IsClosed_2(E: TopoDS_Edge, F: TopoDS_Face): Standard_Boolean;
  static IsClosed_3(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location): Standard_Boolean;
  static IsClosed_4(E: TopoDS_Edge, T: Handle_Poly_Triangulation, L: TopLoc_Location): Standard_Boolean;
  static Tolerance_2(E: TopoDS_Edge): Quantity_AbsorbedDose;
  static SameParameter(E: TopoDS_Edge): Standard_Boolean;
  static SameRange(E: TopoDS_Edge): Standard_Boolean;
  static Degenerated(E: TopoDS_Edge): Standard_Boolean;
  static Range_1(E: TopoDS_Edge, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): void;
  static Range_2(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): void;
  static Range_3(E: TopoDS_Edge, F: TopoDS_Face, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose): void;
  static UVPoints_1(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static UVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_1(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static HasContinuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): Standard_Boolean;
  static Continuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): GeomAbs_Shape;
  static HasContinuity_2(E: TopoDS_Edge, S1: Handle_Geom_Surface, S2: Handle_Geom_Surface, L1: TopLoc_Location, L2: TopLoc_Location): Standard_Boolean;
  static Continuity_2(E: TopoDS_Edge, S1: Handle_Geom_Surface, S2: Handle_Geom_Surface, L1: TopLoc_Location, L2: TopLoc_Location): GeomAbs_Shape;
  static HasContinuity_3(E: TopoDS_Edge): Standard_Boolean;
  static MaxContinuity(theEdge: TopoDS_Edge): GeomAbs_Shape;
  static Pnt(V: TopoDS_Vertex): gp_Pnt;
  static Tolerance_3(V: TopoDS_Vertex): Quantity_AbsorbedDose;
  static Parameter_1(theV: TopoDS_Vertex, theE: TopoDS_Edge, theParam: Quantity_AbsorbedDose): Standard_Boolean;
  static Parameter_2(V: TopoDS_Vertex, E: TopoDS_Edge): Quantity_AbsorbedDose;
  static Parameter_3(V: TopoDS_Vertex, E: TopoDS_Edge, F: TopoDS_Face): Quantity_AbsorbedDose;
  static Parameter_4(V: TopoDS_Vertex, E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location): Quantity_AbsorbedDose;
  static Parameters(V: TopoDS_Vertex, F: TopoDS_Face): gp_Pnt2d;
  static MaxTolerance(theShape: TopoDS_Shape, theSubShape: TopAbs_ShapeEnum): Quantity_AbsorbedDose;
  delete(): void;
}

export declare class StdPrs_ToolTriangulatedShape {
  constructor();
  static IsTriangulated(theShape: TopoDS_Shape): Standard_Boolean;
  static IsClosed(theShape: TopoDS_Shape): Standard_Boolean;
  static ComputeNormals_1(theFace: TopoDS_Face, theTris: Handle_Poly_Triangulation): void;
  static ComputeNormals_2(theFace: TopoDS_Face, theTris: Handle_Poly_Triangulation, thePolyConnect: Poly_Connect): void;
  static Normal(theFace: TopoDS_Face, thePolyConnect: Poly_Connect, theNormals: TColgp_Array1OfDir): void;
  static GetDeflection(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer): Quantity_AbsorbedDose;
  static IsTessellated(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer): Standard_Boolean;
  static Tessellate(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer): Standard_Boolean;
  static ClearOnOwnDeflectionChange(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer, theToResetCoeff: Standard_Boolean): void;
  delete(): void;
}

export declare type BOPAlgo_GlueEnum = {
  BOPAlgo_GlueOff: {};
  BOPAlgo_GlueShift: {};
  BOPAlgo_GlueFull: {};
}

export declare class BOPAlgo_Options {
  Allocator(): Handle_NCollection_BaseAllocator;
  Clear(): void;
  AddError(theAlert: Handle_Message_Alert): void;
  AddWarning(theAlert: Handle_Message_Alert): void;
  HasErrors(): Standard_Boolean;
  HasError(theType: Handle_Standard_Type): Standard_Boolean;
  HasWarnings(): Standard_Boolean;
  HasWarning(theType: Handle_Standard_Type): Standard_Boolean;
  GetReport(): Handle_Message_Report;
  DumpErrors(theOS: Standard_OStream): void;
  DumpWarnings(theOS: Standard_OStream): void;
  ClearWarnings(): void;
  static GetParallelMode(): Standard_Boolean;
  static SetParallelMode(theNewMode: Standard_Boolean): void;
  SetRunParallel(theFlag: Standard_Boolean): void;
  RunParallel(): Standard_Boolean;
  SetFuzzyValue(theFuzz: Quantity_AbsorbedDose): void;
  FuzzyValue(): Quantity_AbsorbedDose;
  SetProgressIndicator(theProgress: Message_ProgressScope): void;
  SetUseOBB(theUseOBB: Standard_Boolean): void;
  UseOBB(): Standard_Boolean;
  delete(): void;
}

  export declare class BOPAlgo_Options_1 extends BOPAlgo_Options {
    constructor();
  }

  export declare class BOPAlgo_Options_2 extends BOPAlgo_Options {
    constructor(theAllocator: Handle_NCollection_BaseAllocator);
  }

export declare class StlAPI {
  constructor();
  static Write(theShape: TopoDS_Shape, theFile: Standard_CString, theAsciiMode: Standard_Boolean): Standard_Boolean;
  static Read(theShape: TopoDS_Shape, aFile: Standard_CString): Standard_Boolean;
  delete(): void;
}

export declare class StlAPI_Writer {
  constructor()
  ASCIIMode(): Standard_Boolean;
  Write(theShape: TopoDS_Shape, theFileName: Standard_CString, theProgress: Message_ProgressRange): Standard_Boolean;
  delete(): void;
}

export declare class StlAPI_Reader {
  constructor();
  Read(theShape: TopoDS_Shape, theFileName: Standard_CString): Standard_Boolean;
  delete(): void;
}

export declare class BRepGProp_Face {
  Load_1(F: TopoDS_Face): void;
  VIntegrationOrder(): Graphic3d_ZLayerId;
  NaturalRestriction(): Standard_Boolean;
  GetFace(): TopoDS_Face;
  Value2d(U: Quantity_AbsorbedDose): gp_Pnt2d;
  SIntOrder(Eps: Quantity_AbsorbedDose): Graphic3d_ZLayerId;
  SVIntSubs(): Graphic3d_ZLayerId;
  SUIntSubs(): Graphic3d_ZLayerId;
  UKnots(Knots: TColStd_Array1OfReal): void;
  VKnots(Knots: TColStd_Array1OfReal): void;
  LIntOrder(Eps: Quantity_AbsorbedDose): Graphic3d_ZLayerId;
  LIntSubs(): Graphic3d_ZLayerId;
  LKnots(Knots: TColStd_Array1OfReal): void;
  UIntegrationOrder(): Graphic3d_ZLayerId;
  Bounds(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose): void;
  Normal(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, VNor: gp_Vec): void;
  Load_2(E: TopoDS_Edge): Standard_Boolean;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  IntegrationOrder(): Graphic3d_ZLayerId;
  D12d(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d): void;
  Load_3(IsFirstParam: Standard_Boolean, theIsoType: GeomAbs_IsoType): void;
  GetUKnots(theUMin: Quantity_AbsorbedDose, theUMax: Quantity_AbsorbedDose, theUKnots: Handle_TColStd_HArray1OfReal): void;
  GetTKnots(theTMin: Quantity_AbsorbedDose, theTMax: Quantity_AbsorbedDose, theTKnots: Handle_TColStd_HArray1OfReal): void;
  delete(): void;
}

  export declare class BRepGProp_Face_1 extends BRepGProp_Face {
    constructor(IsUseSpan: Standard_Boolean);
  }

  export declare class BRepGProp_Face_2 extends BRepGProp_Face {
    constructor(F: TopoDS_Face, IsUseSpan: Standard_Boolean);
  }

export declare class BRepGProp {
  constructor();
  static LinearProperties(S: TopoDS_Shape, LProps: GProp_GProps, SkipShared: Standard_Boolean, UseTriangulation: Standard_Boolean): void;
  static SurfaceProperties_1(S: TopoDS_Shape, SProps: GProp_GProps, SkipShared: Standard_Boolean, UseTriangulation: Standard_Boolean): void;
  static SurfaceProperties_2(S: TopoDS_Shape, SProps: GProp_GProps, Eps: Quantity_AbsorbedDose, SkipShared: Standard_Boolean): Quantity_AbsorbedDose;
  static VolumeProperties_1(S: TopoDS_Shape, VProps: GProp_GProps, OnlyClosed: Standard_Boolean, SkipShared: Standard_Boolean, UseTriangulation: Standard_Boolean): void;
  static VolumeProperties_2(S: TopoDS_Shape, VProps: GProp_GProps, Eps: Quantity_AbsorbedDose, OnlyClosed: Standard_Boolean, SkipShared: Standard_Boolean): Quantity_AbsorbedDose;
  static VolumePropertiesGK_1(S: TopoDS_Shape, VProps: GProp_GProps, Eps: Quantity_AbsorbedDose, OnlyClosed: Standard_Boolean, IsUseSpan: Standard_Boolean, CGFlag: Standard_Boolean, IFlag: Standard_Boolean, SkipShared: Standard_Boolean): Quantity_AbsorbedDose;
  static VolumePropertiesGK_2(S: TopoDS_Shape, VProps: GProp_GProps, thePln: gp_Pln, Eps: Quantity_AbsorbedDose, OnlyClosed: Standard_Boolean, IsUseSpan: Standard_Boolean, CGFlag: Standard_Boolean, IFlag: Standard_Boolean, SkipShared: Standard_Boolean): Quantity_AbsorbedDose;
  delete(): void;
}

export declare type IFSelect_ReturnStatus = {
  IFSelect_RetVoid: {};
  IFSelect_RetDone: {};
  IFSelect_RetError: {};
  IFSelect_RetFail: {};
  IFSelect_RetStop: {};
}

export declare class XSControl_Reader {
  SetNorm(norm: Standard_CString): Standard_Boolean;
  SetWS(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean): void;
  WS(): Handle_XSControl_WorkSession;
  ReadFile(filename: Standard_CString): IFSelect_ReturnStatus;
  ReadStream(theName: Standard_CString, theIStream: Standard_IStream): IFSelect_ReturnStatus;
  Model(): Handle_Interface_InterfaceModel;
  GiveList_1(first: Standard_CString, second: Standard_CString): Handle_TColStd_HSequenceOfTransient;
  GiveList_2(first: Standard_CString, ent: Handle_Standard_Transient): Handle_TColStd_HSequenceOfTransient;
  NbRootsForTransfer(): Graphic3d_ZLayerId;
  RootForTransfer(num: Graphic3d_ZLayerId): Handle_Standard_Transient;
  TransferOneRoot(num: Graphic3d_ZLayerId, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferOne(num: Graphic3d_ZLayerId, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferEntity(start: Handle_Standard_Transient, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferList(list: Handle_TColStd_HSequenceOfTransient, theProgress: Message_ProgressRange): Graphic3d_ZLayerId;
  TransferRoots(theProgress: Message_ProgressRange): Graphic3d_ZLayerId;
  ClearShapes(): void;
  NbShapes(): Graphic3d_ZLayerId;
  Shape(num: Graphic3d_ZLayerId): TopoDS_Shape;
  OneShape(): TopoDS_Shape;
  PrintCheckLoad_1(failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintCheckLoad_2(theStream: Standard_OStream, failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintCheckTransfer_1(failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintCheckTransfer_2(theStream: Standard_OStream, failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintStatsTransfer_1(what: Graphic3d_ZLayerId, mode: Graphic3d_ZLayerId): void;
  PrintStatsTransfer_2(theStream: Standard_OStream, what: Graphic3d_ZLayerId, mode: Graphic3d_ZLayerId): void;
  GetStatsTransfer(list: Handle_TColStd_HSequenceOfTransient, nbMapped: Graphic3d_ZLayerId, nbWithResult: Graphic3d_ZLayerId, nbWithFail: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class XSControl_Reader_1 extends XSControl_Reader {
    constructor();
  }

  export declare class XSControl_Reader_2 extends XSControl_Reader {
    constructor(norm: Standard_CString);
  }

  export declare class XSControl_Reader_3 extends XSControl_Reader {
    constructor(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean);
  }

export declare class BRepFeat_Form extends BRepBuilderAPI_MakeShape {
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  FirstShape(): TopTools_ListOfShape;
  LastShape(): TopTools_ListOfShape;
  NewEdges(): TopTools_ListOfShape;
  TgtEdges(): TopTools_ListOfShape;
  BasisShapeValid(): void;
  GeneratedShapeValid(): void;
  ShapeFromValid(): void;
  ShapeUntilValid(): void;
  GluedFacesValid(): void;
  SketchFaceValid(): void;
  PerfSelectionValid(): void;
  Curves(S: TColGeom_SequenceOfCurve): void;
  BarycCurve(): Handle_Geom_Curve;
  CurrentStatusError(): BRepFeat_StatusError;
  delete(): void;
}

export declare class BRepFeat_MakeDPrism extends BRepFeat_Form {
  Init(Sbase: TopoDS_Shape, Pbase: TopoDS_Face, Skface: TopoDS_Face, Angle: Quantity_AbsorbedDose, Fuse: Graphic3d_ZLayerId, Modify: Standard_Boolean): void;
  Add(E: TopoDS_Edge, OnFace: TopoDS_Face): void;
  Perform_1(Height: Quantity_AbsorbedDose): void;
  Perform_2(Until: TopoDS_Shape): void;
  Perform_3(From: TopoDS_Shape, Until: TopoDS_Shape): void;
  PerformUntilEnd(): void;
  PerformFromEnd(FUntil: TopoDS_Shape): void;
  PerformThruAll(): void;
  PerformUntilHeight(Until: TopoDS_Shape, Height: Quantity_AbsorbedDose): void;
  Curves(S: TColGeom_SequenceOfCurve): void;
  BarycCurve(): Handle_Geom_Curve;
  BossEdges(sig: Graphic3d_ZLayerId): void;
  TopEdges(): TopTools_ListOfShape;
  LatEdges(): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepFeat_MakeDPrism_1 extends BRepFeat_MakeDPrism {
    constructor(Sbase: TopoDS_Shape, Pbase: TopoDS_Face, Skface: TopoDS_Face, Angle: Quantity_AbsorbedDose, Fuse: Graphic3d_ZLayerId, Modify: Standard_Boolean);
  }

  export declare class BRepFeat_MakeDPrism_2 extends BRepFeat_MakeDPrism {
    constructor();
  }

export declare class TopoDS_Edge extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Shell extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Builder {
  constructor();
  MakeWire(W: TopoDS_Wire): void;
  MakeShell(S: TopoDS_Shell): void;
  MakeSolid(S: TopoDS_Solid): void;
  MakeCompSolid(C: TopoDS_CompSolid): void;
  MakeCompound(C: TopoDS_Compound): void;
  Add(S: TopoDS_Shape, C: TopoDS_Shape): void;
  Remove(S: TopoDS_Shape, C: TopoDS_Shape): void;
  delete(): void;
}

export declare class TopoDS {
  constructor();
  static Vertex_1(S: TopoDS_Shape): TopoDS_Vertex;
  static Vertex_2(a0: TopoDS_Shape): TopoDS_Vertex;
  static Edge_1(S: TopoDS_Shape): TopoDS_Edge;
  static Edge_2(a0: TopoDS_Shape): TopoDS_Edge;
  static Wire_1(S: TopoDS_Shape): TopoDS_Wire;
  static Wire_2(a0: TopoDS_Shape): TopoDS_Wire;
  static Face_1(S: TopoDS_Shape): TopoDS_Face;
  static Face_2(a0: TopoDS_Shape): TopoDS_Face;
  static Shell_1(S: TopoDS_Shape): TopoDS_Shell;
  static Shell_2(a0: TopoDS_Shape): TopoDS_Shell;
  static Solid_1(S: TopoDS_Shape): TopoDS_Solid;
  static Solid_2(a0: TopoDS_Shape): TopoDS_Solid;
  static CompSolid_1(S: TopoDS_Shape): TopoDS_CompSolid;
  static CompSolid_2(a0: TopoDS_Shape): TopoDS_CompSolid;
  static Compound_1(S: TopoDS_Shape): TopoDS_Compound;
  static Compound_2(a0: TopoDS_Shape): TopoDS_Compound;
  delete(): void;
}

export declare class TopoDS_Solid extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Vertex extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Wire extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Compound extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Shape {
  constructor()
  IsNull(): Standard_Boolean;
  Nullify(): void;
  Location_1(): TopLoc_Location;
  Location_2(theLoc: TopLoc_Location): void;
  Located(theLoc: TopLoc_Location): TopoDS_Shape;
  Orientation_1(): TopAbs_Orientation;
  Orientation_2(theOrient: TopAbs_Orientation): void;
  Oriented(theOrient: TopAbs_Orientation): TopoDS_Shape;
  TShape_1(): Handle_TopoDS_TShape;
  ShapeType(): TopAbs_ShapeEnum;
  Free_1(): Standard_Boolean;
  Free_2(theIsFree: Standard_Boolean): void;
  Locked_1(): Standard_Boolean;
  Locked_2(theIsLocked: Standard_Boolean): void;
  Modified_1(): Standard_Boolean;
  Modified_2(theIsModified: Standard_Boolean): void;
  Checked_1(): Standard_Boolean;
  Checked_2(theIsChecked: Standard_Boolean): void;
  Orientable_1(): Standard_Boolean;
  Orientable_2(theIsOrientable: Standard_Boolean): void;
  Closed_1(): Standard_Boolean;
  Closed_2(theIsClosed: Standard_Boolean): void;
  Infinite_1(): Standard_Boolean;
  Infinite_2(theIsInfinite: Standard_Boolean): void;
  Convex_1(): Standard_Boolean;
  Convex_2(theIsConvex: Standard_Boolean): void;
  Move(thePosition: TopLoc_Location): void;
  Moved(thePosition: TopLoc_Location): TopoDS_Shape;
  Reverse(): void;
  Reversed(): TopoDS_Shape;
  Complement(): void;
  Complemented(): TopoDS_Shape;
  Compose(theOrient: TopAbs_Orientation): void;
  Composed(theOrient: TopAbs_Orientation): TopoDS_Shape;
  NbChildren(): Graphic3d_ZLayerId;
  IsPartner(theOther: TopoDS_Shape): Standard_Boolean;
  IsSame(theOther: TopoDS_Shape): Standard_Boolean;
  IsEqual(theOther: TopoDS_Shape): Standard_Boolean;
  IsNotEqual(theOther: TopoDS_Shape): Standard_Boolean;
  HashCode(theUpperBound: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  EmptyCopy(): void;
  EmptyCopied(): TopoDS_Shape;
  TShape_2(theTShape: Handle_TopoDS_TShape): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

export declare class TopoDS_CompSolid extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Face extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class ShapeUpgrade_UnifySameDomain extends Standard_Transient {
  Initialize(aShape: TopoDS_Shape, UnifyEdges: Standard_Boolean, UnifyFaces: Standard_Boolean, ConcatBSplines: Standard_Boolean): void;
  AllowInternalEdges(theValue: Standard_Boolean): void;
  KeepShape(theShape: TopoDS_Shape): void;
  KeepShapes(theShapes: TopTools_MapOfShape): void;
  SetSafeInputMode(theValue: Standard_Boolean): void;
  SetLinearTolerance(theValue: Quantity_AbsorbedDose): void;
  SetAngularTolerance(theValue: Quantity_AbsorbedDose): void;
  Build(): void;
  Shape(): TopoDS_Shape;
  History_1(): Handle_BRepTools_History;
  History_2(): Handle_BRepTools_History;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class ShapeUpgrade_UnifySameDomain_1 extends ShapeUpgrade_UnifySameDomain {
    constructor();
  }

  export declare class ShapeUpgrade_UnifySameDomain_2 extends ShapeUpgrade_UnifySameDomain {
    constructor(aShape: TopoDS_Shape, UnifyEdges: Standard_Boolean, UnifyFaces: Standard_Boolean, ConcatBSplines: Standard_Boolean);
  }

export declare class TColgp_Array2OfPnt {
  Init(theValue: gp_Pnt): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  NbRows(): Standard_Integer;
  NbColumns(): Standard_Integer;
  RowLength(): Standard_Integer;
  ColLength(): Standard_Integer;
  LowerRow(): Standard_Integer;
  UpperRow(): Standard_Integer;
  LowerCol(): Standard_Integer;
  UpperCol(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  Assign(theOther: TColgp_Array2OfPnt): TColgp_Array2OfPnt;
  Move(theOther: TColgp_Array2OfPnt): TColgp_Array2OfPnt;
  Value(theRow: Standard_Integer, theCol: Standard_Integer): gp_Pnt;
  ChangeValue(theRow: Standard_Integer, theCol: Standard_Integer): gp_Pnt;
  SetValue(theRow: Standard_Integer, theCol: Standard_Integer, theItem: gp_Pnt): void;
  Resize(theRowLower: Standard_Integer, theRowUpper: Standard_Integer, theColLower: Standard_Integer, theColUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColgp_Array2OfPnt_1 extends TColgp_Array2OfPnt {
    constructor();
  }

  export declare class TColgp_Array2OfPnt_2 extends TColgp_Array2OfPnt {
    constructor(theRowLower: Standard_Integer, theRowUpper: Standard_Integer, theColLower: Standard_Integer, theColUpper: Standard_Integer);
  }

  export declare class TColgp_Array2OfPnt_3 extends TColgp_Array2OfPnt {
    constructor(theOther: TColgp_Array2OfPnt);
  }

  export declare class TColgp_Array2OfPnt_4 extends TColgp_Array2OfPnt {
    constructor(theOther: TColgp_Array2OfPnt);
  }

  export declare class TColgp_Array2OfPnt_5 extends TColgp_Array2OfPnt {
    constructor(theBegin: gp_Pnt, theRowLower: Standard_Integer, theRowUpper: Standard_Integer, theColLower: Standard_Integer, theColUpper: Standard_Integer);
  }

export declare class TColgp_Array1OfPnt {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Pnt): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  Move(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  First(): gp_Pnt;
  ChangeFirst(): gp_Pnt;
  Last(): gp_Pnt;
  ChangeLast(): gp_Pnt;
  Value(theIndex: Standard_Integer): gp_Pnt;
  ChangeValue(theIndex: Standard_Integer): gp_Pnt;
  SetValue(theIndex: Standard_Integer, theItem: gp_Pnt): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColgp_Array1OfPnt_1 extends TColgp_Array1OfPnt {
    constructor();
  }

  export declare class TColgp_Array1OfPnt_2 extends TColgp_Array1OfPnt {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColgp_Array1OfPnt_3 extends TColgp_Array1OfPnt {
    constructor(theOther: TColgp_Array1OfPnt);
  }

  export declare class TColgp_Array1OfPnt_4 extends TColgp_Array1OfPnt {
    constructor(theOther: TColgp_Array1OfPnt);
  }

  export declare class TColgp_Array1OfPnt_5 extends TColgp_Array1OfPnt {
    constructor(theBegin: gp_Pnt, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class TColgp_Array1OfVec {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Vec): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfVec): TColgp_Array1OfVec;
  Move(theOther: TColgp_Array1OfVec): TColgp_Array1OfVec;
  First(): gp_Vec;
  ChangeFirst(): gp_Vec;
  Last(): gp_Vec;
  ChangeLast(): gp_Vec;
  Value(theIndex: Standard_Integer): gp_Vec;
  ChangeValue(theIndex: Standard_Integer): gp_Vec;
  SetValue(theIndex: Standard_Integer, theItem: gp_Vec): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColgp_Array1OfVec_1 extends TColgp_Array1OfVec {
    constructor();
  }

  export declare class TColgp_Array1OfVec_2 extends TColgp_Array1OfVec {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColgp_Array1OfVec_3 extends TColgp_Array1OfVec {
    constructor(theOther: TColgp_Array1OfVec);
  }

  export declare class TColgp_Array1OfVec_4 extends TColgp_Array1OfVec {
    constructor(theOther: TColgp_Array1OfVec);
  }

  export declare class TColgp_Array1OfVec_5 extends TColgp_Array1OfVec {
    constructor(theBegin: gp_Vec, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class TColgp_Array1OfDir {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Dir): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  Move(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  First(): gp_Dir;
  ChangeFirst(): gp_Dir;
  Last(): gp_Dir;
  ChangeLast(): gp_Dir;
  Value(theIndex: Standard_Integer): gp_Dir;
  ChangeValue(theIndex: Standard_Integer): gp_Dir;
  SetValue(theIndex: Standard_Integer, theItem: gp_Dir): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColgp_Array1OfDir_1 extends TColgp_Array1OfDir {
    constructor();
  }

  export declare class TColgp_Array1OfDir_2 extends TColgp_Array1OfDir {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColgp_Array1OfDir_3 extends TColgp_Array1OfDir {
    constructor(theOther: TColgp_Array1OfDir);
  }

  export declare class TColgp_Array1OfDir_4 extends TColgp_Array1OfDir {
    constructor(theOther: TColgp_Array1OfDir);
  }

  export declare class TColgp_Array1OfDir_5 extends TColgp_Array1OfDir {
    constructor(theBegin: gp_Dir, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class TColgp_Array1OfPnt2d {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Pnt2d): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  Move(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  First(): gp_Pnt2d;
  ChangeFirst(): gp_Pnt2d;
  Last(): gp_Pnt2d;
  ChangeLast(): gp_Pnt2d;
  Value(theIndex: Standard_Integer): gp_Pnt2d;
  ChangeValue(theIndex: Standard_Integer): gp_Pnt2d;
  SetValue(theIndex: Standard_Integer, theItem: gp_Pnt2d): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColgp_Array1OfPnt2d_1 extends TColgp_Array1OfPnt2d {
    constructor();
  }

  export declare class TColgp_Array1OfPnt2d_2 extends TColgp_Array1OfPnt2d {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColgp_Array1OfPnt2d_3 extends TColgp_Array1OfPnt2d {
    constructor(theOther: TColgp_Array1OfPnt2d);
  }

  export declare class TColgp_Array1OfPnt2d_4 extends TColgp_Array1OfPnt2d {
    constructor(theOther: TColgp_Array1OfPnt2d);
  }

  export declare class TColgp_Array1OfPnt2d_5 extends TColgp_Array1OfPnt2d {
    constructor(theBegin: gp_Pnt2d, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class BRepTools {
  constructor();
  static UVBounds_1(F: TopoDS_Face, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose): void;
  static UVBounds_2(F: TopoDS_Face, W: TopoDS_Wire, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose): void;
  static UVBounds_3(F: TopoDS_Face, E: TopoDS_Edge, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose): void;
  static AddUVBounds_1(F: TopoDS_Face, B: Bnd_Box2d): void;
  static AddUVBounds_2(F: TopoDS_Face, W: TopoDS_Wire, B: Bnd_Box2d): void;
  static AddUVBounds_3(F: TopoDS_Face, E: TopoDS_Edge, B: Bnd_Box2d): void;
  static Update_1(V: TopoDS_Vertex): void;
  static Update_2(E: TopoDS_Edge): void;
  static Update_3(W: TopoDS_Wire): void;
  static Update_4(F: TopoDS_Face): void;
  static Update_5(S: TopoDS_Shell): void;
  static Update_6(S: TopoDS_Solid): void;
  static Update_7(C: TopoDS_CompSolid): void;
  static Update_8(C: TopoDS_Compound): void;
  static Update_9(S: TopoDS_Shape): void;
  static UpdateFaceUVPoints(theF: TopoDS_Face): void;
  static Clean(S: TopoDS_Shape): void;
  static CleanGeometry(theShape: TopoDS_Shape): void;
  static RemoveUnusedPCurves(S: TopoDS_Shape): void;
  static Triangulation(theShape: TopoDS_Shape, theLinDefl: Quantity_AbsorbedDose, theToCheckFreeEdges: Standard_Boolean): Standard_Boolean;
  static Compare_1(V1: TopoDS_Vertex, V2: TopoDS_Vertex): Standard_Boolean;
  static Compare_2(E1: TopoDS_Edge, E2: TopoDS_Edge): Standard_Boolean;
  static OuterWire(F: TopoDS_Face): TopoDS_Wire;
  static Map3DEdges(S: TopoDS_Shape, M: TopTools_IndexedMapOfShape): void;
  static IsReallyClosed(E: TopoDS_Edge, F: TopoDS_Face): Standard_Boolean;
  static DetectClosedness(theFace: TopoDS_Face, theUclosed: Standard_Boolean, theVclosed: Standard_Boolean): void;
  static Dump(Sh: TopoDS_Shape, S: Standard_OStream): void;
  static Write_1(Sh: TopoDS_Shape, S: Standard_OStream, theProgress: Message_ProgressRange): void;
  static Read_1(Sh: TopoDS_Shape, S: Standard_IStream, B: BRep_Builder, theProgress: Message_ProgressRange): void;
  static Write_2(Sh: TopoDS_Shape, File: Standard_CString, theProgress: Message_ProgressRange): Standard_Boolean;
  static Read_2(Sh: TopoDS_Shape, File: Standard_CString, B: BRep_Builder, theProgress: Message_ProgressRange): Standard_Boolean;
  static EvalAndUpdateTol(theE: TopoDS_Edge, theC3d: Handle_Geom_Curve, theC2d: Handle_Geom2d_Curve, theS: Handle_Geom_Surface, theF: Quantity_AbsorbedDose, theL: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  static OriEdgeInFace(theEdge: TopoDS_Edge, theFace: TopoDS_Face): TopAbs_Orientation;
  static RemoveInternals(theS: TopoDS_Shape, theForce: Standard_Boolean): void;
  delete(): void;
}

export declare class BRepBuilderAPI_Sewing extends Standard_Transient {
  constructor(tolerance: Quantity_AbsorbedDose, option1: Standard_Boolean, option2: Standard_Boolean, option3: Standard_Boolean, option4: Standard_Boolean)
  Init(tolerance: Quantity_AbsorbedDose, option1: Standard_Boolean, option2: Standard_Boolean, option3: Standard_Boolean, option4: Standard_Boolean): void;
  Load(shape: TopoDS_Shape): void;
  Add(shape: TopoDS_Shape): void;
  Perform(theProgress: Message_ProgressRange): void;
  SewedShape(): TopoDS_Shape;
  SetContext(theContext: Handle_BRepTools_ReShape): void;
  GetContext(): Handle_BRepTools_ReShape;
  NbFreeEdges(): Graphic3d_ZLayerId;
  FreeEdge(index: Graphic3d_ZLayerId): TopoDS_Edge;
  NbMultipleEdges(): Graphic3d_ZLayerId;
  MultipleEdge(index: Graphic3d_ZLayerId): TopoDS_Edge;
  NbContigousEdges(): Graphic3d_ZLayerId;
  ContigousEdge(index: Graphic3d_ZLayerId): TopoDS_Edge;
  ContigousEdgeCouple(index: Graphic3d_ZLayerId): TopTools_ListOfShape;
  IsSectionBound(section: TopoDS_Edge): Standard_Boolean;
  SectionToBoundary(section: TopoDS_Edge): TopoDS_Edge;
  NbDegeneratedShapes(): Graphic3d_ZLayerId;
  DegeneratedShape(index: Graphic3d_ZLayerId): TopoDS_Shape;
  IsDegenerated(shape: TopoDS_Shape): Standard_Boolean;
  IsModified(shape: TopoDS_Shape): Standard_Boolean;
  Modified(shape: TopoDS_Shape): TopoDS_Shape;
  IsModifiedSubShape(shape: TopoDS_Shape): Standard_Boolean;
  ModifiedSubShape(shape: TopoDS_Shape): TopoDS_Shape;
  Dump(): void;
  NbDeletedFaces(): Graphic3d_ZLayerId;
  DeletedFace(index: Graphic3d_ZLayerId): TopoDS_Face;
  WhichFace(theEdg: TopoDS_Edge, index: Graphic3d_ZLayerId): TopoDS_Face;
  SameParameterMode(): Standard_Boolean;
  SetSameParameterMode(SameParameterMode: Standard_Boolean): void;
  Tolerance(): Quantity_AbsorbedDose;
  SetTolerance(theToler: Quantity_AbsorbedDose): void;
  MinTolerance(): Quantity_AbsorbedDose;
  SetMinTolerance(theMinToler: Quantity_AbsorbedDose): void;
  MaxTolerance(): Quantity_AbsorbedDose;
  SetMaxTolerance(theMaxToler: Quantity_AbsorbedDose): void;
  FaceMode(): Standard_Boolean;
  SetFaceMode(theFaceMode: Standard_Boolean): void;
  FloatingEdgesMode(): Standard_Boolean;
  SetFloatingEdgesMode(theFloatingEdgesMode: Standard_Boolean): void;
  LocalTolerancesMode(): Standard_Boolean;
  SetLocalTolerancesMode(theLocalTolerancesMode: Standard_Boolean): void;
  SetNonManifoldMode(theNonManifoldMode: Standard_Boolean): void;
  NonManifoldMode(): Standard_Boolean;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class BRepBuilderAPI_ModifyShape extends BRepBuilderAPI_MakeShape {
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  ModifiedShape(S: TopoDS_Shape): TopoDS_Shape;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeVertex extends BRepBuilderAPI_MakeShape {
  constructor(P: gp_Pnt)
  Vertex(): TopoDS_Vertex;
  delete(): void;
}

export declare type BRepBuilderAPI_WireError = {
  BRepBuilderAPI_WireDone: {};
  BRepBuilderAPI_EmptyWire: {};
  BRepBuilderAPI_DisconnectedWire: {};
  BRepBuilderAPI_NonManifoldWire: {};
}

export declare class BRepBuilderAPI_MakeWire extends BRepBuilderAPI_MakeShape {
  Add_1(E: TopoDS_Edge): void;
  Add_2(W: TopoDS_Wire): void;
  Add_3(L: TopTools_ListOfShape): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_WireError;
  Wire(): TopoDS_Wire;
  Edge(): TopoDS_Edge;
  Vertex(): TopoDS_Vertex;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeWire_1 extends BRepBuilderAPI_MakeWire {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeWire_2 extends BRepBuilderAPI_MakeWire {
    constructor(E: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_3 extends BRepBuilderAPI_MakeWire {
    constructor(E1: TopoDS_Edge, E2: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_4 extends BRepBuilderAPI_MakeWire {
    constructor(E1: TopoDS_Edge, E2: TopoDS_Edge, E3: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_5 extends BRepBuilderAPI_MakeWire {
    constructor(E1: TopoDS_Edge, E2: TopoDS_Edge, E3: TopoDS_Edge, E4: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_6 extends BRepBuilderAPI_MakeWire {
    constructor(W: TopoDS_Wire);
  }

  export declare class BRepBuilderAPI_MakeWire_7 extends BRepBuilderAPI_MakeWire {
    constructor(W: TopoDS_Wire, E: TopoDS_Edge);
  }

export declare class BRepBuilderAPI_MakeShape extends BRepBuilderAPI_Command {
  Build(): void;
  Shape(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeSolid extends BRepBuilderAPI_MakeShape {
  Add(S: TopoDS_Shell): void;
  IsDone(): Standard_Boolean;
  Solid(): TopoDS_Solid;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeSolid_1 extends BRepBuilderAPI_MakeSolid {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeSolid_2 extends BRepBuilderAPI_MakeSolid {
    constructor(S: TopoDS_CompSolid);
  }

  export declare class BRepBuilderAPI_MakeSolid_3 extends BRepBuilderAPI_MakeSolid {
    constructor(S: TopoDS_Shell);
  }

  export declare class BRepBuilderAPI_MakeSolid_4 extends BRepBuilderAPI_MakeSolid {
    constructor(S1: TopoDS_Shell, S2: TopoDS_Shell);
  }

  export declare class BRepBuilderAPI_MakeSolid_5 extends BRepBuilderAPI_MakeSolid {
    constructor(S1: TopoDS_Shell, S2: TopoDS_Shell, S3: TopoDS_Shell);
  }

  export declare class BRepBuilderAPI_MakeSolid_6 extends BRepBuilderAPI_MakeSolid {
    constructor(So: TopoDS_Solid);
  }

  export declare class BRepBuilderAPI_MakeSolid_7 extends BRepBuilderAPI_MakeSolid {
    constructor(So: TopoDS_Solid, S: TopoDS_Shell);
  }

export declare class BRepBuilderAPI_MakeEdge extends BRepBuilderAPI_MakeShape {
  Init_1(C: Handle_Geom_Curve): void;
  Init_2(C: Handle_Geom_Curve, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose): void;
  Init_3(C: Handle_Geom_Curve, P1: gp_Pnt, P2: gp_Pnt): void;
  Init_4(C: Handle_Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex): void;
  Init_5(C: Handle_Geom_Curve, P1: gp_Pnt, P2: gp_Pnt, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose): void;
  Init_6(C: Handle_Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose): void;
  Init_7(C: Handle_Geom2d_Curve, S: Handle_Geom_Surface): void;
  Init_8(C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose): void;
  Init_9(C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, P1: gp_Pnt, P2: gp_Pnt): void;
  Init_10(C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex): void;
  Init_11(C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, P1: gp_Pnt, P2: gp_Pnt, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose): void;
  Init_12(C: Handle_Geom2d_Curve, S: Handle_Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_EdgeError;
  Edge(): TopoDS_Edge;
  Vertex1(): TopoDS_Vertex;
  Vertex2(): TopoDS_Vertex;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeEdge_1 extends BRepBuilderAPI_MakeEdge {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeEdge_2 extends BRepBuilderAPI_MakeEdge {
    constructor(V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_3 extends BRepBuilderAPI_MakeEdge {
    constructor(P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_4 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin);
  }

  export declare class BRepBuilderAPI_MakeEdge_5 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_6 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_7 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_8 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ);
  }

  export declare class BRepBuilderAPI_MakeEdge_9 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_10 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_11 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_12 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips);
  }

  export declare class BRepBuilderAPI_MakeEdge_13 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_14 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_15 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_16 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr);
  }

  export declare class BRepBuilderAPI_MakeEdge_17 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_18 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_19 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_20 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab);
  }

  export declare class BRepBuilderAPI_MakeEdge_21 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_22 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_23 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_24 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom_Curve);
  }

  export declare class BRepBuilderAPI_MakeEdge_25 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom_Curve, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_26 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom_Curve, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_27 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_28 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom_Curve, P1: gp_Pnt, P2: gp_Pnt, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_29 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_30 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom2d_Curve, S: Handle_Geom_Surface);
  }

  export declare class BRepBuilderAPI_MakeEdge_31 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom2d_Curve, S: Handle_Geom_Surface, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_32 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom2d_Curve, S: Handle_Geom_Surface, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_33 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom2d_Curve, S: Handle_Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_34 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom2d_Curve, S: Handle_Geom_Surface, P1: gp_Pnt, P2: gp_Pnt, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeEdge_35 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Handle_Geom2d_Curve, S: Handle_Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Quantity_AbsorbedDose, p2: Quantity_AbsorbedDose);
  }

export declare class BRepBuilderAPI_Command {
  IsDone(): Standard_Boolean;
  Check(): void;
  delete(): void;
}

export declare type BRepBuilderAPI_TransitionMode = {
  BRepBuilderAPI_Transformed: {};
  BRepBuilderAPI_RightCorner: {};
  BRepBuilderAPI_RoundCorner: {};
}

export declare class BRepBuilderAPI_Transform extends BRepBuilderAPI_ModifyShape {
  Perform(S: TopoDS_Shape, Copy: Standard_Boolean): void;
  ModifiedShape(S: TopoDS_Shape): TopoDS_Shape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepBuilderAPI_Transform_1 extends BRepBuilderAPI_Transform {
    constructor(T: gp_Trsf);
  }

  export declare class BRepBuilderAPI_Transform_2 extends BRepBuilderAPI_Transform {
    constructor(S: TopoDS_Shape, T: gp_Trsf, Copy: Standard_Boolean);
  }

export declare class BRepBuilderAPI_MakeFace extends BRepBuilderAPI_MakeShape {
  Init_1(F: TopoDS_Face): void;
  Init_2(S: Handle_Geom_Surface, Bound: Standard_Boolean, TolDegen: Quantity_AbsorbedDose): void;
  Init_3(S: Handle_Geom_Surface, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose, TolDegen: Quantity_AbsorbedDose): void;
  Add(W: TopoDS_Wire): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_FaceError;
  Face(): TopoDS_Face;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeFace_1 extends BRepBuilderAPI_MakeFace {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeFace_2 extends BRepBuilderAPI_MakeFace {
    constructor(F: TopoDS_Face);
  }

  export declare class BRepBuilderAPI_MakeFace_3 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln);
  }

  export declare class BRepBuilderAPI_MakeFace_4 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder);
  }

  export declare class BRepBuilderAPI_MakeFace_5 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone);
  }

  export declare class BRepBuilderAPI_MakeFace_6 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere);
  }

  export declare class BRepBuilderAPI_MakeFace_7 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus);
  }

  export declare class BRepBuilderAPI_MakeFace_8 extends BRepBuilderAPI_MakeFace {
    constructor(S: Handle_Geom_Surface, TolDegen: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_9 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_10 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_11 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_12 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_13 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_14 extends BRepBuilderAPI_MakeFace {
    constructor(S: Handle_Geom_Surface, UMin: Quantity_AbsorbedDose, UMax: Quantity_AbsorbedDose, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose, TolDegen: Quantity_AbsorbedDose);
  }

  export declare class BRepBuilderAPI_MakeFace_15 extends BRepBuilderAPI_MakeFace {
    constructor(W: TopoDS_Wire, OnlyPlane: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_16 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_17 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_18 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_19 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_20 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_21 extends BRepBuilderAPI_MakeFace {
    constructor(S: Handle_Geom_Surface, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_22 extends BRepBuilderAPI_MakeFace {
    constructor(F: TopoDS_Face, W: TopoDS_Wire);
  }

export declare class Handle_Geom_BezierCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_BezierCurve): void;
  get(): Geom_BezierCurve;
  delete(): void;
}

  export declare class Handle_Geom_BezierCurve_1 extends Handle_Geom_BezierCurve {
    constructor();
  }

  export declare class Handle_Geom_BezierCurve_2 extends Handle_Geom_BezierCurve {
    constructor(thePtr: Geom_BezierCurve);
  }

  export declare class Handle_Geom_BezierCurve_3 extends Handle_Geom_BezierCurve {
    constructor(theHandle: Handle_Geom_BezierCurve);
  }

  export declare class Handle_Geom_BezierCurve_4 extends Handle_Geom_BezierCurve {
    constructor(theHandle: Handle_Geom_BezierCurve);
  }

export declare class Geom_BezierCurve extends Geom_BoundedCurve {
  Increase(Degree: Graphic3d_ZLayerId): void;
  InsertPoleAfter_1(Index: Graphic3d_ZLayerId, P: gp_Pnt): void;
  InsertPoleAfter_2(Index: Graphic3d_ZLayerId, P: gp_Pnt, Weight: Quantity_AbsorbedDose): void;
  InsertPoleBefore_1(Index: Graphic3d_ZLayerId, P: gp_Pnt): void;
  InsertPoleBefore_2(Index: Graphic3d_ZLayerId, P: gp_Pnt, Weight: Quantity_AbsorbedDose): void;
  RemovePole(Index: Graphic3d_ZLayerId): void;
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Segment(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose): void;
  SetPole_1(Index: Graphic3d_ZLayerId, P: gp_Pnt): void;
  SetPole_2(Index: Graphic3d_ZLayerId, P: gp_Pnt, Weight: Quantity_AbsorbedDose): void;
  SetWeight(Index: Graphic3d_ZLayerId, Weight: Quantity_AbsorbedDose): void;
  IsClosed(): Standard_Boolean;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Graphic3d_ZLayerId;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  StartPoint(): gp_Pnt;
  EndPoint(): gp_Pnt;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  NbPoles(): Graphic3d_ZLayerId;
  Pole(Index: Graphic3d_ZLayerId): gp_Pnt;
  Poles_1(P: TColgp_Array1OfPnt): void;
  Poles_2(): TColgp_Array1OfPnt;
  Weight(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): Graphic3d_ZLayerId;
  Resolution(Tolerance3D: Quantity_AbsorbedDose, UTolerance: Quantity_AbsorbedDose): void;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom_BezierCurve_1 extends Geom_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt);
  }

  export declare class Geom_BezierCurve_2 extends Geom_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt, PoleWeights: TColStd_Array1OfReal);
  }

export declare class Geom_TrimmedCurve extends Geom_BoundedCurve {
  constructor(C: Handle_Geom_Curve, U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean)
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  SetTrim(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean): void;
  BasisCurve(): Handle_Geom_Curve;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  EndPoint(): gp_Pnt;
  FirstParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  StartPoint(): gp_Pnt;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  Transform(T: gp_Trsf): void;
  TransformedParameter(U: Quantity_AbsorbedDose, T: gp_Trsf): Quantity_AbsorbedDose;
  ParametricTransformation(T: gp_Trsf): Quantity_AbsorbedDose;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom_TrimmedCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_TrimmedCurve): void;
  get(): Geom_TrimmedCurve;
  delete(): void;
}

  export declare class Handle_Geom_TrimmedCurve_1 extends Handle_Geom_TrimmedCurve {
    constructor();
  }

  export declare class Handle_Geom_TrimmedCurve_2 extends Handle_Geom_TrimmedCurve {
    constructor(thePtr: Geom_TrimmedCurve);
  }

  export declare class Handle_Geom_TrimmedCurve_3 extends Handle_Geom_TrimmedCurve {
    constructor(theHandle: Handle_Geom_TrimmedCurve);
  }

  export declare class Handle_Geom_TrimmedCurve_4 extends Handle_Geom_TrimmedCurve {
    constructor(theHandle: Handle_Geom_TrimmedCurve);
  }

export declare class Geom_CylindricalSurface extends Geom_ElementarySurface {
  SetCylinder(C: gp_Cylinder): void;
  SetRadius(R: Quantity_AbsorbedDose): void;
  Cylinder(): gp_Cylinder;
  UReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VReversedParameter(V: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  TransformParameters(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose): void;
  Coefficients(A1: Quantity_AbsorbedDose, A2: Quantity_AbsorbedDose, A3: Quantity_AbsorbedDose, B1: Quantity_AbsorbedDose, B2: Quantity_AbsorbedDose, B3: Quantity_AbsorbedDose, C1: Quantity_AbsorbedDose, C2: Quantity_AbsorbedDose, C3: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  Radius(): Quantity_AbsorbedDose;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  IsVPeriodic(): Standard_Boolean;
  UIso(U: Quantity_AbsorbedDose): Handle_Geom_Curve;
  VIso(V: Quantity_AbsorbedDose): Handle_Geom_Curve;
  D0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  Transform(T: gp_Trsf): void;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom_CylindricalSurface_1 extends Geom_CylindricalSurface {
    constructor(A3: gp_Ax3, Radius: Quantity_AbsorbedDose);
  }

  export declare class Geom_CylindricalSurface_2 extends Geom_CylindricalSurface {
    constructor(C: gp_Cylinder);
  }

export declare class Geom_BSplineCurve extends Geom_BoundedCurve {
  IncreaseDegree(Degree: Graphic3d_ZLayerId): void;
  IncreaseMultiplicity_1(Index: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncreaseMultiplicity_2(I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncrementMultiplicity(I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  InsertKnot(U: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  InsertKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  RemoveKnot(Index: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId, Tolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Segment(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, theTolerance: Quantity_AbsorbedDose): void;
  SetKnot_1(Index: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose): void;
  SetKnots(K: TColStd_Array1OfReal): void;
  SetKnot_2(Index: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId): void;
  PeriodicNormalization(U: Quantity_AbsorbedDose): void;
  SetPeriodic(): void;
  SetOrigin_1(Index: Graphic3d_ZLayerId): void;
  SetOrigin_2(U: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): void;
  SetNotPeriodic(): void;
  SetPole_1(Index: Graphic3d_ZLayerId, P: gp_Pnt): void;
  SetPole_2(Index: Graphic3d_ZLayerId, P: gp_Pnt, Weight: Quantity_AbsorbedDose): void;
  SetWeight(Index: Graphic3d_ZLayerId, Weight: Quantity_AbsorbedDose): void;
  MovePoint(U: Quantity_AbsorbedDose, P: gp_Pnt, Index1: Graphic3d_ZLayerId, Index2: Graphic3d_ZLayerId, FirstModifiedPole: Graphic3d_ZLayerId, LastModifiedPole: Graphic3d_ZLayerId): void;
  MovePointAndTangent(U: Quantity_AbsorbedDose, P: gp_Pnt, Tangent: gp_Vec, Tolerance: Quantity_AbsorbedDose, StartingCondition: Graphic3d_ZLayerId, EndingCondition: Graphic3d_ZLayerId, ErrorStatus: Graphic3d_ZLayerId): void;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsG1(theTf: Quantity_AbsorbedDose, theTl: Quantity_AbsorbedDose, theAngTol: Quantity_AbsorbedDose): Standard_Boolean;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Graphic3d_ZLayerId;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  LocalValue(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId): gp_Pnt;
  LocalD0(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt): void;
  LocalD1(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt, V1: gp_Vec): void;
  LocalD2(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  LocalD3(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  LocalDN(U: Quantity_AbsorbedDose, FromK1: Graphic3d_ZLayerId, ToK2: Graphic3d_ZLayerId, N: Graphic3d_ZLayerId): gp_Vec;
  EndPoint(): gp_Pnt;
  FirstUKnotIndex(): Graphic3d_ZLayerId;
  FirstParameter(): Quantity_AbsorbedDose;
  Knot(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Knots_1(K: TColStd_Array1OfReal): void;
  Knots_2(): TColStd_Array1OfReal;
  KnotSequence_1(K: TColStd_Array1OfReal): void;
  KnotSequence_2(): TColStd_Array1OfReal;
  KnotDistribution(): GeomAbs_BSplKnotDistribution;
  LastUKnotIndex(): Graphic3d_ZLayerId;
  LastParameter(): Quantity_AbsorbedDose;
  LocateU(U: Quantity_AbsorbedDose, ParametricTolerance: Quantity_AbsorbedDose, I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, WithKnotRepetition: Standard_Boolean): void;
  Multiplicity(Index: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Multiplicities_1(M: TColStd_Array1OfInteger): void;
  Multiplicities_2(): TColStd_Array1OfInteger;
  NbKnots(): Graphic3d_ZLayerId;
  NbPoles(): Graphic3d_ZLayerId;
  Pole(Index: Graphic3d_ZLayerId): gp_Pnt;
  Poles_1(P: TColgp_Array1OfPnt): void;
  Poles_2(): TColgp_Array1OfPnt;
  StartPoint(): gp_Pnt;
  Weight(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): Graphic3d_ZLayerId;
  Resolution(Tolerance3D: Quantity_AbsorbedDose, UTolerance: Quantity_AbsorbedDose): void;
  Copy(): Handle_Geom_Geometry;
  IsEqual(theOther: Handle_Geom_BSplineCurve, thePreci: Quantity_AbsorbedDose): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom_BSplineCurve_1 extends Geom_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Graphic3d_ZLayerId, Periodic: Standard_Boolean);
  }

  export declare class Geom_BSplineCurve_2 extends Geom_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt, Weights: TColStd_Array1OfReal, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Graphic3d_ZLayerId, Periodic: Standard_Boolean, CheckRational: Standard_Boolean);
  }

export declare class Handle_Geom_BSplineCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_BSplineCurve): void;
  get(): Geom_BSplineCurve;
  delete(): void;
}

  export declare class Handle_Geom_BSplineCurve_1 extends Handle_Geom_BSplineCurve {
    constructor();
  }

  export declare class Handle_Geom_BSplineCurve_2 extends Handle_Geom_BSplineCurve {
    constructor(thePtr: Geom_BSplineCurve);
  }

  export declare class Handle_Geom_BSplineCurve_3 extends Handle_Geom_BSplineCurve {
    constructor(theHandle: Handle_Geom_BSplineCurve);
  }

  export declare class Handle_Geom_BSplineCurve_4 extends Handle_Geom_BSplineCurve {
    constructor(theHandle: Handle_Geom_BSplineCurve);
  }

export declare class Geom_Surface extends Geom_Geometry {
  UReverse(): void;
  UReversed(): Handle_Geom_Surface;
  UReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VReverse(): void;
  VReversed(): Handle_Geom_Surface;
  VReversedParameter(V: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  TransformParameters(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose): void;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Quantity_AbsorbedDose;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Quantity_AbsorbedDose;
  UIso(U: Quantity_AbsorbedDose): Handle_Geom_Curve;
  VIso(V: Quantity_AbsorbedDose): Handle_Geom_Curve;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsCNv(N: Graphic3d_ZLayerId): Standard_Boolean;
  D0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  Value(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom_Surface {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Surface): void;
  get(): Geom_Surface;
  delete(): void;
}

  export declare class Handle_Geom_Surface_1 extends Handle_Geom_Surface {
    constructor();
  }

  export declare class Handle_Geom_Surface_2 extends Handle_Geom_Surface {
    constructor(thePtr: Geom_Surface);
  }

  export declare class Handle_Geom_Surface_3 extends Handle_Geom_Surface {
    constructor(theHandle: Handle_Geom_Surface);
  }

  export declare class Handle_Geom_Surface_4 extends Handle_Geom_Surface {
    constructor(theHandle: Handle_Geom_Surface);
  }

export declare class Handle_Geom_Curve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Curve): void;
  get(): Geom_Curve;
  delete(): void;
}

  export declare class Handle_Geom_Curve_1 extends Handle_Geom_Curve {
    constructor();
  }

  export declare class Handle_Geom_Curve_2 extends Handle_Geom_Curve {
    constructor(thePtr: Geom_Curve);
  }

  export declare class Handle_Geom_Curve_3 extends Handle_Geom_Curve {
    constructor(theHandle: Handle_Geom_Curve);
  }

  export declare class Handle_Geom_Curve_4 extends Handle_Geom_Curve {
    constructor(theHandle: Handle_Geom_Curve);
  }

export declare class Geom_Curve extends Geom_Geometry {
  Reverse(): void;
  ReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  TransformedParameter(U: Quantity_AbsorbedDose, T: gp_Trsf): Quantity_AbsorbedDose;
  ParametricTransformation(T: gp_Trsf): Quantity_AbsorbedDose;
  Reversed(): Handle_Geom_Curve;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  Value(U: Quantity_AbsorbedDose): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Geom_BoundedCurve extends Geom_Curve {
  EndPoint(): gp_Pnt;
  StartPoint(): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Geom_Geometry extends Standard_Transient {
  Mirror_1(P: gp_Pnt): void;
  Mirror_2(A1: gp_Ax1): void;
  Mirror_3(A2: gp_Ax2): void;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Translate_1(V: gp_Vec): void;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Transform(T: gp_Trsf): void;
  Mirrored_1(P: gp_Pnt): Handle_Geom_Geometry;
  Mirrored_2(A1: gp_Ax1): Handle_Geom_Geometry;
  Mirrored_3(A2: gp_Ax2): Handle_Geom_Geometry;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): Handle_Geom_Geometry;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): Handle_Geom_Geometry;
  Transformed(T: gp_Trsf): Handle_Geom_Geometry;
  Translated_1(V: gp_Vec): Handle_Geom_Geometry;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): Handle_Geom_Geometry;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Geom_BoundedSurface extends Geom_Surface {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Geom_ElementarySurface extends Geom_Surface {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theLoc: gp_Pnt): void;
  SetPosition(theAx3: gp_Ax3): void;
  Axis(): gp_Ax1;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  UReverse(): void;
  UReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VReverse(): void;
  VReversedParameter(V: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsCNv(N: Graphic3d_ZLayerId): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom_BSplineSurface {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_BSplineSurface): void;
  get(): Geom_BSplineSurface;
  delete(): void;
}

  export declare class Handle_Geom_BSplineSurface_1 extends Handle_Geom_BSplineSurface {
    constructor();
  }

  export declare class Handle_Geom_BSplineSurface_2 extends Handle_Geom_BSplineSurface {
    constructor(thePtr: Geom_BSplineSurface);
  }

  export declare class Handle_Geom_BSplineSurface_3 extends Handle_Geom_BSplineSurface {
    constructor(theHandle: Handle_Geom_BSplineSurface);
  }

  export declare class Handle_Geom_BSplineSurface_4 extends Handle_Geom_BSplineSurface {
    constructor(theHandle: Handle_Geom_BSplineSurface);
  }

export declare class Geom_BSplineSurface extends Geom_BoundedSurface {
  ExchangeUV(): void;
  SetUPeriodic(): void;
  SetVPeriodic(): void;
  PeriodicNormalization(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose): void;
  SetUOrigin(Index: Graphic3d_ZLayerId): void;
  SetVOrigin(Index: Graphic3d_ZLayerId): void;
  SetUNotPeriodic(): void;
  SetVNotPeriodic(): void;
  UReverse(): void;
  VReverse(): void;
  UReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VReversedParameter(V: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  IncreaseDegree(UDegree: Graphic3d_ZLayerId, VDegree: Graphic3d_ZLayerId): void;
  InsertUKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  InsertVKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  RemoveUKnot(Index: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId, Tolerance: Quantity_AbsorbedDose): Standard_Boolean;
  RemoveVKnot(Index: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId, Tolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IncreaseUMultiplicity_1(UIndex: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncreaseUMultiplicity_2(FromI1: Graphic3d_ZLayerId, ToI2: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncrementUMultiplicity(FromI1: Graphic3d_ZLayerId, ToI2: Graphic3d_ZLayerId, Step: Graphic3d_ZLayerId): void;
  IncreaseVMultiplicity_1(VIndex: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncreaseVMultiplicity_2(FromI1: Graphic3d_ZLayerId, ToI2: Graphic3d_ZLayerId, M: Graphic3d_ZLayerId): void;
  IncrementVMultiplicity(FromI1: Graphic3d_ZLayerId, ToI2: Graphic3d_ZLayerId, Step: Graphic3d_ZLayerId): void;
  InsertUKnot(U: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  InsertVKnot(V: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId, ParametricTolerance: Quantity_AbsorbedDose, Add: Standard_Boolean): void;
  Segment(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose, theUTolerance: Quantity_AbsorbedDose, theVTolerance: Quantity_AbsorbedDose): void;
  CheckAndSegment(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose, theUTolerance: Quantity_AbsorbedDose, theVTolerance: Quantity_AbsorbedDose): void;
  SetUKnot_1(UIndex: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose): void;
  SetUKnots(UK: TColStd_Array1OfReal): void;
  SetUKnot_2(UIndex: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId): void;
  SetVKnot_1(VIndex: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose): void;
  SetVKnots(VK: TColStd_Array1OfReal): void;
  SetVKnot_2(VIndex: Graphic3d_ZLayerId, K: Quantity_AbsorbedDose, M: Graphic3d_ZLayerId): void;
  LocateU(U: Quantity_AbsorbedDose, ParametricTolerance: Quantity_AbsorbedDose, I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, WithKnotRepetition: Standard_Boolean): void;
  LocateV(V: Quantity_AbsorbedDose, ParametricTolerance: Quantity_AbsorbedDose, I1: Graphic3d_ZLayerId, I2: Graphic3d_ZLayerId, WithKnotRepetition: Standard_Boolean): void;
  SetPole_1(UIndex: Graphic3d_ZLayerId, VIndex: Graphic3d_ZLayerId, P: gp_Pnt): void;
  SetPole_2(UIndex: Graphic3d_ZLayerId, VIndex: Graphic3d_ZLayerId, P: gp_Pnt, Weight: Quantity_AbsorbedDose): void;
  SetPoleCol_1(VIndex: Graphic3d_ZLayerId, CPoles: TColgp_Array1OfPnt): void;
  SetPoleCol_2(VIndex: Graphic3d_ZLayerId, CPoles: TColgp_Array1OfPnt, CPoleWeights: TColStd_Array1OfReal): void;
  SetPoleRow_1(UIndex: Graphic3d_ZLayerId, CPoles: TColgp_Array1OfPnt, CPoleWeights: TColStd_Array1OfReal): void;
  SetPoleRow_2(UIndex: Graphic3d_ZLayerId, CPoles: TColgp_Array1OfPnt): void;
  SetWeight(UIndex: Graphic3d_ZLayerId, VIndex: Graphic3d_ZLayerId, Weight: Quantity_AbsorbedDose): void;
  SetWeightCol(VIndex: Graphic3d_ZLayerId, CPoleWeights: TColStd_Array1OfReal): void;
  SetWeightRow(UIndex: Graphic3d_ZLayerId, CPoleWeights: TColStd_Array1OfReal): void;
  MovePoint(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, UIndex1: Graphic3d_ZLayerId, UIndex2: Graphic3d_ZLayerId, VIndex1: Graphic3d_ZLayerId, VIndex2: Graphic3d_ZLayerId, UFirstIndex: Graphic3d_ZLayerId, ULastIndex: Graphic3d_ZLayerId, VFirstIndex: Graphic3d_ZLayerId, VLastIndex: Graphic3d_ZLayerId): void;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsCNu(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsCNv(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  IsURational(): Standard_Boolean;
  IsVPeriodic(): Standard_Boolean;
  IsVRational(): Standard_Boolean;
  Bounds(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose): void;
  Continuity(): GeomAbs_Shape;
  FirstUKnotIndex(): Graphic3d_ZLayerId;
  FirstVKnotIndex(): Graphic3d_ZLayerId;
  LastUKnotIndex(): Graphic3d_ZLayerId;
  LastVKnotIndex(): Graphic3d_ZLayerId;
  NbUKnots(): Graphic3d_ZLayerId;
  NbUPoles(): Graphic3d_ZLayerId;
  NbVKnots(): Graphic3d_ZLayerId;
  NbVPoles(): Graphic3d_ZLayerId;
  Pole(UIndex: Graphic3d_ZLayerId, VIndex: Graphic3d_ZLayerId): gp_Pnt;
  Poles_1(P: TColgp_Array2OfPnt): void;
  Poles_2(): TColgp_Array2OfPnt;
  UDegree(): Graphic3d_ZLayerId;
  UKnot(UIndex: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  UKnotDistribution(): GeomAbs_BSplKnotDistribution;
  UKnots_1(Ku: TColStd_Array1OfReal): void;
  UKnots_2(): TColStd_Array1OfReal;
  UKnotSequence_1(Ku: TColStd_Array1OfReal): void;
  UKnotSequence_2(): TColStd_Array1OfReal;
  UMultiplicity(UIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  UMultiplicities_1(Mu: TColStd_Array1OfInteger): void;
  UMultiplicities_2(): TColStd_Array1OfInteger;
  VDegree(): Graphic3d_ZLayerId;
  VKnot(VIndex: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  VKnotDistribution(): GeomAbs_BSplKnotDistribution;
  VKnots_1(Kv: TColStd_Array1OfReal): void;
  VKnots_2(): TColStd_Array1OfReal;
  VKnotSequence_1(Kv: TColStd_Array1OfReal): void;
  VKnotSequence_2(): TColStd_Array1OfReal;
  VMultiplicity(VIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  VMultiplicities_1(Mv: TColStd_Array1OfInteger): void;
  VMultiplicities_2(): TColStd_Array1OfInteger;
  Weight(UIndex: Graphic3d_ZLayerId, VIndex: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Weights_1(W: TColStd_Array2OfReal): void;
  Weights_2(): TColStd_Array2OfReal;
  D0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  LocalD0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, FromUK1: Graphic3d_ZLayerId, ToUK2: Graphic3d_ZLayerId, FromVK1: Graphic3d_ZLayerId, ToVK2: Graphic3d_ZLayerId, P: gp_Pnt): void;
  LocalD1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, FromUK1: Graphic3d_ZLayerId, ToUK2: Graphic3d_ZLayerId, FromVK1: Graphic3d_ZLayerId, ToVK2: Graphic3d_ZLayerId, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  LocalD2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, FromUK1: Graphic3d_ZLayerId, ToUK2: Graphic3d_ZLayerId, FromVK1: Graphic3d_ZLayerId, ToVK2: Graphic3d_ZLayerId, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  LocalD3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, FromUK1: Graphic3d_ZLayerId, ToUK2: Graphic3d_ZLayerId, FromVK1: Graphic3d_ZLayerId, ToVK2: Graphic3d_ZLayerId, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  LocalDN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, FromUK1: Graphic3d_ZLayerId, ToUK2: Graphic3d_ZLayerId, FromVK1: Graphic3d_ZLayerId, ToVK2: Graphic3d_ZLayerId, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  LocalValue(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, FromUK1: Graphic3d_ZLayerId, ToUK2: Graphic3d_ZLayerId, FromVK1: Graphic3d_ZLayerId, ToVK2: Graphic3d_ZLayerId): gp_Pnt;
  UIso_1(U: Quantity_AbsorbedDose): Handle_Geom_Curve;
  VIso_1(V: Quantity_AbsorbedDose): Handle_Geom_Curve;
  UIso_2(U: Quantity_AbsorbedDose, CheckRational: Standard_Boolean): Handle_Geom_Curve;
  VIso_2(V: Quantity_AbsorbedDose, CheckRational: Standard_Boolean): Handle_Geom_Curve;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): Graphic3d_ZLayerId;
  Resolution(Tolerance3D: Quantity_AbsorbedDose, UTolerance: Quantity_AbsorbedDose, VTolerance: Quantity_AbsorbedDose): void;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom_BSplineSurface_1 extends Geom_BSplineSurface {
    constructor(Poles: TColgp_Array2OfPnt, UKnots: TColStd_Array1OfReal, VKnots: TColStd_Array1OfReal, UMults: TColStd_Array1OfInteger, VMults: TColStd_Array1OfInteger, UDegree: Graphic3d_ZLayerId, VDegree: Graphic3d_ZLayerId, UPeriodic: Standard_Boolean, VPeriodic: Standard_Boolean);
  }

  export declare class Geom_BSplineSurface_2 extends Geom_BSplineSurface {
    constructor(Poles: TColgp_Array2OfPnt, Weights: TColStd_Array2OfReal, UKnots: TColStd_Array1OfReal, VKnots: TColStd_Array1OfReal, UMults: TColStd_Array1OfInteger, VMults: TColStd_Array1OfInteger, UDegree: Graphic3d_ZLayerId, VDegree: Graphic3d_ZLayerId, UPeriodic: Standard_Boolean, VPeriodic: Standard_Boolean);
  }

export declare class Geom_ConicalSurface extends Geom_ElementarySurface {
  SetCone(C: gp_Cone): void;
  SetRadius(R: Quantity_AbsorbedDose): void;
  SetSemiAngle(Ang: Quantity_AbsorbedDose): void;
  Cone(): gp_Cone;
  UReversedParameter(U: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VReversedParameter(V: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VReverse(): void;
  TransformParameters(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Apex(): gp_Pnt;
  Bounds(U1: Quantity_AbsorbedDose, U2: Quantity_AbsorbedDose, V1: Quantity_AbsorbedDose, V2: Quantity_AbsorbedDose): void;
  Coefficients(A1: Quantity_AbsorbedDose, A2: Quantity_AbsorbedDose, A3: Quantity_AbsorbedDose, B1: Quantity_AbsorbedDose, B2: Quantity_AbsorbedDose, B3: Quantity_AbsorbedDose, C1: Quantity_AbsorbedDose, C2: Quantity_AbsorbedDose, C3: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  RefRadius(): Quantity_AbsorbedDose;
  SemiAngle(): Quantity_AbsorbedDose;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  IsVPeriodic(): Standard_Boolean;
  UIso(U: Quantity_AbsorbedDose): Handle_Geom_Curve;
  VIso(V: Quantity_AbsorbedDose): Handle_Geom_Curve;
  D0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  Transform(T: gp_Trsf): void;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

  export declare class Geom_ConicalSurface_1 extends Geom_ConicalSurface {
    constructor(A3: gp_Ax3, Ang: Quantity_AbsorbedDose, Radius: Quantity_AbsorbedDose);
  }

  export declare class Geom_ConicalSurface_2 extends Geom_ConicalSurface {
    constructor(C: gp_Cone);
  }

export declare class TopLoc_Location {
  IsIdentity(): Standard_Boolean;
  Identity(): void;
  FirstDatum(): Handle_TopLoc_Datum3D;
  FirstPower(): Graphic3d_ZLayerId;
  NextLocation(): TopLoc_Location;
  Transformation(): gp_Trsf;
  Inverted(): TopLoc_Location;
  Multiplied(Other: TopLoc_Location): TopLoc_Location;
  Divided(Other: TopLoc_Location): TopLoc_Location;
  Predivided(Other: TopLoc_Location): TopLoc_Location;
  Powered(pwr: Graphic3d_ZLayerId): TopLoc_Location;
  HashCode(theUpperBound: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  IsEqual(Other: TopLoc_Location): Standard_Boolean;
  IsDifferent(Other: TopLoc_Location): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  ShallowDump(S: Standard_OStream): void;
  delete(): void;
}

  export declare class TopLoc_Location_1 extends TopLoc_Location {
    constructor();
  }

  export declare class TopLoc_Location_2 extends TopLoc_Location {
    constructor(T: gp_Trsf);
  }

  export declare class TopLoc_Location_3 extends TopLoc_Location {
    constructor(D: Handle_TopLoc_Datum3D);
  }

export declare class gp_Ax3 {
  XReverse(): void;
  YReverse(): void;
  ZReverse(): void;
  SetAxis(A1: gp_Ax1): void;
  SetDirection(V: gp_Dir): void;
  SetLocation(P: gp_Pnt): void;
  SetXDirection(Vx: gp_Dir): void;
  SetYDirection(Vy: gp_Dir): void;
  Angle(Other: gp_Ax3): Quantity_AbsorbedDose;
  Axis(): gp_Ax1;
  Ax2(): gp_Ax2;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  XDirection(): gp_Dir;
  YDirection(): gp_Dir;
  Direct(): Standard_Boolean;
  IsCoplanar_1(Other: gp_Ax3, LinearTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsCoplanar_2(A1: gp_Ax1, LinearTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax3;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax3;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax3;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Ax3;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Ax3;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Ax3;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Ax3;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Ax3;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Ax3_1 extends gp_Ax3 {
    constructor();
  }

  export declare class gp_Ax3_2 extends gp_Ax3 {
    constructor(A: gp_Ax2);
  }

  export declare class gp_Ax3_3 extends gp_Ax3 {
    constructor(P: gp_Pnt, N: gp_Dir, Vx: gp_Dir);
  }

  export declare class gp_Ax3_4 extends gp_Ax3 {
    constructor(P: gp_Pnt, V: gp_Dir);
  }

export declare class gp_Dir {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose, Zv: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetZ(Z: Quantity_AbsorbedDose): void;
  SetXYZ(Coord: gp_XYZ): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose, Zv: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  Z(): Quantity_AbsorbedDose;
  XYZ(): gp_XYZ;
  IsEqual(Other: gp_Dir, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsNormal(Other: gp_Dir, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsOpposite(Other: gp_Dir, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsParallel(Other: gp_Dir, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Angle(Other: gp_Dir): Quantity_AbsorbedDose;
  AngleWithRef(Other: gp_Dir, VRef: gp_Dir): Quantity_AbsorbedDose;
  Cross(Right: gp_Dir): void;
  Crossed(Right: gp_Dir): gp_Dir;
  CrossCross(V1: gp_Dir, V2: gp_Dir): void;
  CrossCrossed(V1: gp_Dir, V2: gp_Dir): gp_Dir;
  Dot(Other: gp_Dir): Quantity_AbsorbedDose;
  DotCross(V1: gp_Dir, V2: gp_Dir): Quantity_AbsorbedDose;
  Reverse(): void;
  Reversed(): gp_Dir;
  Mirror_1(V: gp_Dir): void;
  Mirrored_1(V: gp_Dir): gp_Dir;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Dir;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Dir;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Dir;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Dir;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Dir_1 extends gp_Dir {
    constructor();
  }

  export declare class gp_Dir_2 extends gp_Dir {
    constructor(V: gp_Vec);
  }

  export declare class gp_Dir_3 extends gp_Dir {
    constructor(Coord: gp_XYZ);
  }

  export declare class gp_Dir_4 extends gp_Dir {
    constructor(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose, Zv: Quantity_AbsorbedDose);
  }

export declare class gp_Ax1 {
  SetDirection(V: gp_Dir): void;
  SetLocation(P: gp_Pnt): void;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  IsCoaxial(Other: gp_Ax1, AngularTolerance: Quantity_AbsorbedDose, LinearTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsNormal(Other: gp_Ax1, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsOpposite(Other: gp_Ax1, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsParallel(Other: gp_Ax1, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Angle(Other: gp_Ax1): Quantity_AbsorbedDose;
  Reverse(): void;
  Reversed(): gp_Ax1;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax1;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax1;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax1;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Ax1;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Ax1;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Ax1;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Ax1;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Ax1;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Ax1_1 extends gp_Ax1 {
    constructor();
  }

  export declare class gp_Ax1_2 extends gp_Ax1 {
    constructor(P: gp_Pnt, V: gp_Dir);
  }

export declare class gp_Elips {
  SetAxis(A1: gp_Ax1): void;
  SetLocation(P: gp_Pnt): void;
  SetMajorRadius(MajorRadius: Quantity_AbsorbedDose): void;
  SetMinorRadius(MinorRadius: Quantity_AbsorbedDose): void;
  SetPosition(A2: gp_Ax2): void;
  Area(): Quantity_AbsorbedDose;
  Axis(): gp_Ax1;
  Directrix1(): gp_Ax1;
  Directrix2(): gp_Ax1;
  Eccentricity(): Quantity_AbsorbedDose;
  Focal(): Quantity_AbsorbedDose;
  Focus1(): gp_Pnt;
  Focus2(): gp_Pnt;
  Location(): gp_Pnt;
  MajorRadius(): Quantity_AbsorbedDose;
  MinorRadius(): Quantity_AbsorbedDose;
  Parameter(): Quantity_AbsorbedDose;
  Position(): gp_Ax2;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Elips;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Elips;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Elips;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Elips;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Elips;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Elips;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Elips;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Elips;
  delete(): void;
}

  export declare class gp_Elips_1 extends gp_Elips {
    constructor();
  }

  export declare class gp_Elips_2 extends gp_Elips {
    constructor(A2: gp_Ax2, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose);
  }

export declare class gp_Ax2 {
  SetAxis(A1: gp_Ax1): void;
  SetDirection(V: gp_Dir): void;
  SetLocation(P: gp_Pnt): void;
  SetXDirection(Vx: gp_Dir): void;
  SetYDirection(Vy: gp_Dir): void;
  Angle(Other: gp_Ax2): Quantity_AbsorbedDose;
  Axis(): gp_Ax1;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  XDirection(): gp_Dir;
  YDirection(): gp_Dir;
  IsCoplanar_1(Other: gp_Ax2, LinearTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsCoplanar_2(A1: gp_Ax1, LinearTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax2;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax2;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax2;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Ax2;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Ax2;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Ax2;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Ax2;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Ax2;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Ax2_1 extends gp_Ax2 {
    constructor();
  }

  export declare class gp_Ax2_2 extends gp_Ax2 {
    constructor(P: gp_Pnt, N: gp_Dir, Vx: gp_Dir);
  }

  export declare class gp_Ax2_3 extends gp_Ax2 {
    constructor(P: gp_Pnt, V: gp_Dir);
  }

export declare class gp_Vec {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose, Zv: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetZ(Z: Quantity_AbsorbedDose): void;
  SetXYZ(Coord: gp_XYZ): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose, Zv: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  Z(): Quantity_AbsorbedDose;
  XYZ(): gp_XYZ;
  IsEqual(Other: gp_Vec, LinearTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsNormal(Other: gp_Vec, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsOpposite(Other: gp_Vec, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsParallel(Other: gp_Vec, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Angle(Other: gp_Vec): Quantity_AbsorbedDose;
  AngleWithRef(Other: gp_Vec, VRef: gp_Vec): Quantity_AbsorbedDose;
  Magnitude(): Quantity_AbsorbedDose;
  SquareMagnitude(): Quantity_AbsorbedDose;
  Add(Other: gp_Vec): void;
  Added(Other: gp_Vec): gp_Vec;
  Subtract(Right: gp_Vec): void;
  Subtracted(Right: gp_Vec): gp_Vec;
  Multiply(Scalar: Quantity_AbsorbedDose): void;
  Multiplied(Scalar: Quantity_AbsorbedDose): gp_Vec;
  Divide(Scalar: Quantity_AbsorbedDose): void;
  Divided(Scalar: Quantity_AbsorbedDose): gp_Vec;
  Cross(Right: gp_Vec): void;
  Crossed(Right: gp_Vec): gp_Vec;
  CrossMagnitude(Right: gp_Vec): Quantity_AbsorbedDose;
  CrossSquareMagnitude(Right: gp_Vec): Quantity_AbsorbedDose;
  CrossCross(V1: gp_Vec, V2: gp_Vec): void;
  CrossCrossed(V1: gp_Vec, V2: gp_Vec): gp_Vec;
  Dot(Other: gp_Vec): Quantity_AbsorbedDose;
  DotCross(V1: gp_Vec, V2: gp_Vec): Quantity_AbsorbedDose;
  Normalize(): void;
  Normalized(): gp_Vec;
  Reverse(): void;
  Reversed(): gp_Vec;
  SetLinearForm_1(A1: Quantity_AbsorbedDose, V1: gp_Vec, A2: Quantity_AbsorbedDose, V2: gp_Vec, A3: Quantity_AbsorbedDose, V3: gp_Vec, V4: gp_Vec): void;
  SetLinearForm_2(A1: Quantity_AbsorbedDose, V1: gp_Vec, A2: Quantity_AbsorbedDose, V2: gp_Vec, A3: Quantity_AbsorbedDose, V3: gp_Vec): void;
  SetLinearForm_3(A1: Quantity_AbsorbedDose, V1: gp_Vec, A2: Quantity_AbsorbedDose, V2: gp_Vec, V3: gp_Vec): void;
  SetLinearForm_4(A1: Quantity_AbsorbedDose, V1: gp_Vec, A2: Quantity_AbsorbedDose, V2: gp_Vec): void;
  SetLinearForm_5(A1: Quantity_AbsorbedDose, V1: gp_Vec, V2: gp_Vec): void;
  SetLinearForm_6(V1: gp_Vec, V2: gp_Vec): void;
  Mirror_1(V: gp_Vec): void;
  Mirrored_1(V: gp_Vec): gp_Vec;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Vec;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Vec;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Vec;
  Scale(S: Quantity_AbsorbedDose): void;
  Scaled(S: Quantity_AbsorbedDose): gp_Vec;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Vec;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class gp_Vec_1 extends gp_Vec {
    constructor();
  }

  export declare class gp_Vec_2 extends gp_Vec {
    constructor(V: gp_Dir);
  }

  export declare class gp_Vec_3 extends gp_Vec {
    constructor(Coord: gp_XYZ);
  }

  export declare class gp_Vec_4 extends gp_Vec {
    constructor(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose, Zv: Quantity_AbsorbedDose);
  }

  export declare class gp_Vec_5 extends gp_Vec {
    constructor(P1: gp_Pnt, P2: gp_Pnt);
  }

export declare class gp_Circ2d {
  SetLocation(P: gp_Pnt2d): void;
  SetXAxis(A: gp_Ax2d): void;
  SetAxis(A: gp_Ax22d): void;
  SetYAxis(A: gp_Ax2d): void;
  SetRadius(Radius: Quantity_AbsorbedDose): void;
  Area(): Quantity_AbsorbedDose;
  Coefficients(A: Quantity_AbsorbedDose, B: Quantity_AbsorbedDose, C: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose, E: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose): void;
  Contains(P: gp_Pnt2d, LinearTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Distance(P: gp_Pnt2d): Quantity_AbsorbedDose;
  SquareDistance(P: gp_Pnt2d): Quantity_AbsorbedDose;
  Length(): Quantity_AbsorbedDose;
  Location(): gp_Pnt2d;
  Radius(): Quantity_AbsorbedDose;
  Axis(): gp_Ax22d;
  Position(): gp_Ax22d;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Reverse(): void;
  Reversed(): gp_Circ2d;
  IsDirect(): Standard_Boolean;
  Mirror_1(P: gp_Pnt2d): void;
  Mirrored_1(P: gp_Pnt2d): gp_Circ2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Circ2d;
  Rotate(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): void;
  Rotated(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): gp_Circ2d;
  Scale(P: gp_Pnt2d, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt2d, S: Quantity_AbsorbedDose): gp_Circ2d;
  Transform(T: gp_Trsf2d): void;
  Transformed(T: gp_Trsf2d): gp_Circ2d;
  Translate_1(V: gp_Vec2d): void;
  Translated_1(V: gp_Vec2d): gp_Circ2d;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): gp_Circ2d;
  delete(): void;
}

  export declare class gp_Circ2d_1 extends gp_Circ2d {
    constructor();
  }

  export declare class gp_Circ2d_2 extends gp_Circ2d {
    constructor(XAxis: gp_Ax2d, Radius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class gp_Circ2d_3 extends gp_Circ2d {
    constructor(Axis: gp_Ax22d, Radius: Quantity_AbsorbedDose);
  }

export declare class gp_Dir2d {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetXY(Coord: gp_XY): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  XY(): gp_XY;
  IsEqual(Other: gp_Dir2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsNormal(Other: gp_Dir2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsOpposite(Other: gp_Dir2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsParallel(Other: gp_Dir2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Angle(Other: gp_Dir2d): Quantity_AbsorbedDose;
  Crossed(Right: gp_Dir2d): Quantity_AbsorbedDose;
  Dot(Other: gp_Dir2d): Quantity_AbsorbedDose;
  Reverse(): void;
  Reversed(): gp_Dir2d;
  Mirror_1(V: gp_Dir2d): void;
  Mirrored_1(V: gp_Dir2d): gp_Dir2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Dir2d;
  Rotate(Ang: Quantity_AbsorbedDose): void;
  Rotated(Ang: Quantity_AbsorbedDose): gp_Dir2d;
  Transform(T: gp_Trsf2d): void;
  Transformed(T: gp_Trsf2d): gp_Dir2d;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class gp_Dir2d_1 extends gp_Dir2d {
    constructor();
  }

  export declare class gp_Dir2d_2 extends gp_Dir2d {
    constructor(V: gp_Vec2d);
  }

  export declare class gp_Dir2d_3 extends gp_Dir2d {
    constructor(Coord: gp_XY);
  }

  export declare class gp_Dir2d_4 extends gp_Dir2d {
    constructor(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose);
  }

export declare class gp_Trsf {
  SetMirror_1(P: gp_Pnt): void;
  SetMirror_2(A1: gp_Ax1): void;
  SetMirror_3(A2: gp_Ax2): void;
  SetRotation_1(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  SetRotation_2(R: gp_Quaternion): void;
  SetRotationPart(R: gp_Quaternion): void;
  SetScale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  SetDisplacement(FromSystem1: gp_Ax3, ToSystem2: gp_Ax3): void;
  SetTransformation_1(FromSystem1: gp_Ax3, ToSystem2: gp_Ax3): void;
  SetTransformation_2(ToSystem: gp_Ax3): void;
  SetTransformation_3(R: gp_Quaternion, T: gp_Vec): void;
  SetTranslation_1(V: gp_Vec): void;
  SetTranslation_2(P1: gp_Pnt, P2: gp_Pnt): void;
  SetTranslationPart(V: gp_Vec): void;
  SetScaleFactor(S: Quantity_AbsorbedDose): void;
  SetForm(P: gp_TrsfForm): void;
  SetValues(a11: Quantity_AbsorbedDose, a12: Quantity_AbsorbedDose, a13: Quantity_AbsorbedDose, a14: Quantity_AbsorbedDose, a21: Quantity_AbsorbedDose, a22: Quantity_AbsorbedDose, a23: Quantity_AbsorbedDose, a24: Quantity_AbsorbedDose, a31: Quantity_AbsorbedDose, a32: Quantity_AbsorbedDose, a33: Quantity_AbsorbedDose, a34: Quantity_AbsorbedDose): void;
  IsNegative(): Standard_Boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): Quantity_AbsorbedDose;
  TranslationPart(): gp_XYZ;
  GetRotation_1(theAxis: gp_XYZ, theAngle: Quantity_AbsorbedDose): Standard_Boolean;
  GetRotation_2(): gp_Quaternion;
  VectorialPart(): gp_Mat;
  HVectorialPart(): gp_Mat;
  Value(Row: Graphic3d_ZLayerId, Col: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Invert(): void;
  Inverted(): gp_Trsf;
  Multiplied(T: gp_Trsf): gp_Trsf;
  Multiply(T: gp_Trsf): void;
  PreMultiply(T: gp_Trsf): void;
  Power(N: Graphic3d_ZLayerId): void;
  Powered(N: Graphic3d_ZLayerId): gp_Trsf;
  Transforms_1(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose, Z: Quantity_AbsorbedDose): void;
  Transforms_2(Coord: gp_XYZ): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Trsf_1 extends gp_Trsf {
    constructor();
  }

  export declare class gp_Trsf_2 extends gp_Trsf {
    constructor(T: gp_Trsf2d);
  }

export declare class gp_Circ {
  SetAxis(A1: gp_Ax1): void;
  SetLocation(P: gp_Pnt): void;
  SetPosition(A2: gp_Ax2): void;
  SetRadius(Radius: Quantity_AbsorbedDose): void;
  Area(): Quantity_AbsorbedDose;
  Axis(): gp_Ax1;
  Length(): Quantity_AbsorbedDose;
  Location(): gp_Pnt;
  Position(): gp_Ax2;
  Radius(): Quantity_AbsorbedDose;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Distance(P: gp_Pnt): Quantity_AbsorbedDose;
  SquareDistance(P: gp_Pnt): Quantity_AbsorbedDose;
  Contains(P: gp_Pnt, LinearTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Circ;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Circ;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Circ;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Circ;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Circ;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Circ;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Circ;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Circ;
  delete(): void;
}

  export declare class gp_Circ_1 extends gp_Circ {
    constructor();
  }

  export declare class gp_Circ_2 extends gp_Circ {
    constructor(A2: gp_Ax2, Radius: Quantity_AbsorbedDose);
  }

export declare class gp_Ax2d {
  SetLocation(Locat: gp_Pnt2d): void;
  SetDirection(V: gp_Dir2d): void;
  Location(): gp_Pnt2d;
  Direction(): gp_Dir2d;
  IsCoaxial(Other: gp_Ax2d, AngularTolerance: Quantity_AbsorbedDose, LinearTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsNormal(Other: gp_Ax2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsOpposite(Other: gp_Ax2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsParallel(Other: gp_Ax2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Angle(Other: gp_Ax2d): Quantity_AbsorbedDose;
  Reverse(): void;
  Reversed(): gp_Ax2d;
  Mirror_1(P: gp_Pnt2d): void;
  Mirrored_1(P: gp_Pnt2d): gp_Ax2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Ax2d;
  Rotate(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): void;
  Rotated(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): gp_Ax2d;
  Scale(P: gp_Pnt2d, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt2d, S: Quantity_AbsorbedDose): gp_Ax2d;
  Transform(T: gp_Trsf2d): void;
  Transformed(T: gp_Trsf2d): gp_Ax2d;
  Translate_1(V: gp_Vec2d): void;
  Translated_1(V: gp_Vec2d): gp_Ax2d;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): gp_Ax2d;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class gp_Ax2d_1 extends gp_Ax2d {
    constructor();
  }

  export declare class gp_Ax2d_2 extends gp_Ax2d {
    constructor(P: gp_Pnt2d, V: gp_Dir2d);
  }

export declare class gp_Vec2d {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetXY(Coord: gp_XY): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  XY(): gp_XY;
  IsEqual(Other: gp_Vec2d, LinearTolerance: Quantity_AbsorbedDose, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsNormal(Other: gp_Vec2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsOpposite(Other: gp_Vec2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  IsParallel(Other: gp_Vec2d, AngularTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Angle(Other: gp_Vec2d): Quantity_AbsorbedDose;
  Magnitude(): Quantity_AbsorbedDose;
  SquareMagnitude(): Quantity_AbsorbedDose;
  Add(Other: gp_Vec2d): void;
  Added(Other: gp_Vec2d): gp_Vec2d;
  Crossed(Right: gp_Vec2d): Quantity_AbsorbedDose;
  CrossMagnitude(Right: gp_Vec2d): Quantity_AbsorbedDose;
  CrossSquareMagnitude(Right: gp_Vec2d): Quantity_AbsorbedDose;
  Divide(Scalar: Quantity_AbsorbedDose): void;
  Divided(Scalar: Quantity_AbsorbedDose): gp_Vec2d;
  Dot(Other: gp_Vec2d): Quantity_AbsorbedDose;
  GetNormal(): gp_Vec2d;
  Multiply(Scalar: Quantity_AbsorbedDose): void;
  Multiplied(Scalar: Quantity_AbsorbedDose): gp_Vec2d;
  Normalize(): void;
  Normalized(): gp_Vec2d;
  Reverse(): void;
  Reversed(): gp_Vec2d;
  Subtract(Right: gp_Vec2d): void;
  Subtracted(Right: gp_Vec2d): gp_Vec2d;
  SetLinearForm_1(A1: Quantity_AbsorbedDose, V1: gp_Vec2d, A2: Quantity_AbsorbedDose, V2: gp_Vec2d, V3: gp_Vec2d): void;
  SetLinearForm_2(A1: Quantity_AbsorbedDose, V1: gp_Vec2d, A2: Quantity_AbsorbedDose, V2: gp_Vec2d): void;
  SetLinearForm_3(A1: Quantity_AbsorbedDose, V1: gp_Vec2d, V2: gp_Vec2d): void;
  SetLinearForm_4(Left: gp_Vec2d, Right: gp_Vec2d): void;
  Mirror_1(V: gp_Vec2d): void;
  Mirrored_1(V: gp_Vec2d): gp_Vec2d;
  Mirror_2(A1: gp_Ax2d): void;
  Mirrored_2(A1: gp_Ax2d): gp_Vec2d;
  Rotate(Ang: Quantity_AbsorbedDose): void;
  Rotated(Ang: Quantity_AbsorbedDose): gp_Vec2d;
  Scale(S: Quantity_AbsorbedDose): void;
  Scaled(S: Quantity_AbsorbedDose): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Transformed(T: gp_Trsf2d): gp_Vec2d;
  delete(): void;
}

  export declare class gp_Vec2d_1 extends gp_Vec2d {
    constructor();
  }

  export declare class gp_Vec2d_2 extends gp_Vec2d {
    constructor(V: gp_Dir2d);
  }

  export declare class gp_Vec2d_3 extends gp_Vec2d {
    constructor(Coord: gp_XY);
  }

  export declare class gp_Vec2d_4 extends gp_Vec2d {
    constructor(Xv: Quantity_AbsorbedDose, Yv: Quantity_AbsorbedDose);
  }

  export declare class gp_Vec2d_5 extends gp_Vec2d {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

export declare class gp_GTrsf2d {
  SetAffinity(A: gp_Ax2d, Ratio: Quantity_AbsorbedDose): void;
  SetValue(Row: Graphic3d_ZLayerId, Col: Graphic3d_ZLayerId, Value: Quantity_AbsorbedDose): void;
  SetTranslationPart(Coord: gp_XY): void;
  SetTrsf2d(T: gp_Trsf2d): void;
  SetVectorialPart(Matrix: gp_Mat2d): void;
  IsNegative(): Standard_Boolean;
  IsSingular(): Standard_Boolean;
  Form(): gp_TrsfForm;
  TranslationPart(): gp_XY;
  VectorialPart(): gp_Mat2d;
  Value(Row: Graphic3d_ZLayerId, Col: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Invert(): void;
  Inverted(): gp_GTrsf2d;
  Multiplied(T: gp_GTrsf2d): gp_GTrsf2d;
  Multiply(T: gp_GTrsf2d): void;
  PreMultiply(T: gp_GTrsf2d): void;
  Power(N: Graphic3d_ZLayerId): void;
  Powered(N: Graphic3d_ZLayerId): gp_GTrsf2d;
  Transforms_1(Coord: gp_XY): void;
  Transformed(Coord: gp_XY): gp_XY;
  Transforms_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose): void;
  Trsf2d(): gp_Trsf2d;
  delete(): void;
}

  export declare class gp_GTrsf2d_1 extends gp_GTrsf2d {
    constructor();
  }

  export declare class gp_GTrsf2d_2 extends gp_GTrsf2d {
    constructor(T: gp_Trsf2d);
  }

  export declare class gp_GTrsf2d_3 extends gp_GTrsf2d {
    constructor(M: gp_Mat2d, V: gp_XY);
  }

export declare class gp_Elips2d {
  SetLocation(P: gp_Pnt2d): void;
  SetMajorRadius(MajorRadius: Quantity_AbsorbedDose): void;
  SetMinorRadius(MinorRadius: Quantity_AbsorbedDose): void;
  SetAxis(A: gp_Ax22d): void;
  SetXAxis(A: gp_Ax2d): void;
  SetYAxis(A: gp_Ax2d): void;
  Area(): Quantity_AbsorbedDose;
  Coefficients(A: Quantity_AbsorbedDose, B: Quantity_AbsorbedDose, C: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose, E: Quantity_AbsorbedDose, F: Quantity_AbsorbedDose): void;
  Directrix1(): gp_Ax2d;
  Directrix2(): gp_Ax2d;
  Eccentricity(): Quantity_AbsorbedDose;
  Focal(): Quantity_AbsorbedDose;
  Focus1(): gp_Pnt2d;
  Focus2(): gp_Pnt2d;
  Location(): gp_Pnt2d;
  MajorRadius(): Quantity_AbsorbedDose;
  MinorRadius(): Quantity_AbsorbedDose;
  Parameter(): Quantity_AbsorbedDose;
  Axis(): gp_Ax22d;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Reverse(): void;
  Reversed(): gp_Elips2d;
  IsDirect(): Standard_Boolean;
  Mirror_1(P: gp_Pnt2d): void;
  Mirrored_1(P: gp_Pnt2d): gp_Elips2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Elips2d;
  Rotate(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): void;
  Rotated(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): gp_Elips2d;
  Scale(P: gp_Pnt2d, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt2d, S: Quantity_AbsorbedDose): gp_Elips2d;
  Transform(T: gp_Trsf2d): void;
  Transformed(T: gp_Trsf2d): gp_Elips2d;
  Translate_1(V: gp_Vec2d): void;
  Translated_1(V: gp_Vec2d): gp_Elips2d;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): gp_Elips2d;
  delete(): void;
}

  export declare class gp_Elips2d_1 extends gp_Elips2d {
    constructor();
  }

  export declare class gp_Elips2d_2 extends gp_Elips2d {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose, Sense: Standard_Boolean);
  }

  export declare class gp_Elips2d_3 extends gp_Elips2d {
    constructor(A: gp_Ax22d, MajorRadius: Quantity_AbsorbedDose, MinorRadius: Quantity_AbsorbedDose);
  }

export declare class gp_GTrsf {
  SetAffinity_1(A1: gp_Ax1, Ratio: Quantity_AbsorbedDose): void;
  SetAffinity_2(A2: gp_Ax2, Ratio: Quantity_AbsorbedDose): void;
  SetValue(Row: Graphic3d_ZLayerId, Col: Graphic3d_ZLayerId, Value: Quantity_AbsorbedDose): void;
  SetVectorialPart(Matrix: gp_Mat): void;
  SetTranslationPart(Coord: gp_XYZ): void;
  SetTrsf(T: gp_Trsf): void;
  IsNegative(): Standard_Boolean;
  IsSingular(): Standard_Boolean;
  Form(): gp_TrsfForm;
  SetForm(): void;
  TranslationPart(): gp_XYZ;
  VectorialPart(): gp_Mat;
  Value(Row: Graphic3d_ZLayerId, Col: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Invert(): void;
  Inverted(): gp_GTrsf;
  Multiplied(T: gp_GTrsf): gp_GTrsf;
  Multiply(T: gp_GTrsf): void;
  PreMultiply(T: gp_GTrsf): void;
  Power(N: Graphic3d_ZLayerId): void;
  Powered(N: Graphic3d_ZLayerId): gp_GTrsf;
  Transforms_1(Coord: gp_XYZ): void;
  Transforms_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose, Z: Quantity_AbsorbedDose): void;
  Trsf(): gp_Trsf;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class gp_GTrsf_1 extends gp_GTrsf {
    constructor();
  }

  export declare class gp_GTrsf_2 extends gp_GTrsf {
    constructor(T: gp_Trsf);
  }

  export declare class gp_GTrsf_3 extends gp_GTrsf {
    constructor(M: gp_Mat, V: gp_XYZ);
  }

export declare class gp_Cylinder {
  SetAxis(A1: gp_Ax1): void;
  SetLocation(Loc: gp_Pnt): void;
  SetPosition(A3: gp_Ax3): void;
  SetRadius(R: Quantity_AbsorbedDose): void;
  UReverse(): void;
  VReverse(): void;
  Direct(): Standard_Boolean;
  Axis(): gp_Ax1;
  Coefficients(A1: Quantity_AbsorbedDose, A2: Quantity_AbsorbedDose, A3: Quantity_AbsorbedDose, B1: Quantity_AbsorbedDose, B2: Quantity_AbsorbedDose, B3: Quantity_AbsorbedDose, C1: Quantity_AbsorbedDose, C2: Quantity_AbsorbedDose, C3: Quantity_AbsorbedDose, D: Quantity_AbsorbedDose): void;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  Radius(): Quantity_AbsorbedDose;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Cylinder;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Cylinder;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Cylinder;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Cylinder;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Cylinder;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Cylinder;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Cylinder;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Cylinder;
  delete(): void;
}

  export declare class gp_Cylinder_1 extends gp_Cylinder {
    constructor();
  }

  export declare class gp_Cylinder_2 extends gp_Cylinder {
    constructor(A3: gp_Ax3, Radius: Quantity_AbsorbedDose);
  }

export declare class gp_Pnt {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(Xp: Quantity_AbsorbedDose, Yp: Quantity_AbsorbedDose, Zp: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetZ(Z: Quantity_AbsorbedDose): void;
  SetXYZ(Coord: gp_XYZ): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(Xp: Quantity_AbsorbedDose, Yp: Quantity_AbsorbedDose, Zp: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  Z(): Quantity_AbsorbedDose;
  XYZ(): gp_XYZ;
  Coord_3(): gp_XYZ;
  ChangeCoord(): gp_XYZ;
  BaryCenter(Alpha: Quantity_AbsorbedDose, P: gp_Pnt, Beta: Quantity_AbsorbedDose): void;
  IsEqual(Other: gp_Pnt, LinearTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Distance(Other: gp_Pnt): Quantity_AbsorbedDose;
  SquareDistance(Other: gp_Pnt): Quantity_AbsorbedDose;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Pnt;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Pnt;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Pnt;
  Rotate(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): void;
  Rotated(A1: gp_Ax1, Ang: Quantity_AbsorbedDose): gp_Pnt;
  Scale(P: gp_Pnt, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt, S: Quantity_AbsorbedDose): gp_Pnt;
  Transform(T: gp_Trsf): void;
  Transformed(T: gp_Trsf): gp_Pnt;
  Translate_1(V: gp_Vec): void;
  Translated_1(V: gp_Vec): gp_Pnt;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Pnt_1 extends gp_Pnt {
    constructor();
  }

  export declare class gp_Pnt_2 extends gp_Pnt {
    constructor(Coord: gp_XYZ);
  }

  export declare class gp_Pnt_3 extends gp_Pnt {
    constructor(Xp: Quantity_AbsorbedDose, Yp: Quantity_AbsorbedDose, Zp: Quantity_AbsorbedDose);
  }

export declare class gp_Pnt2d {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(Xp: Quantity_AbsorbedDose, Yp: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetXY(Coord: gp_XY): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(Xp: Quantity_AbsorbedDose, Yp: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  XY(): gp_XY;
  Coord_3(): gp_XY;
  ChangeCoord(): gp_XY;
  IsEqual(Other: gp_Pnt2d, LinearTolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Distance(Other: gp_Pnt2d): Quantity_AbsorbedDose;
  SquareDistance(Other: gp_Pnt2d): Quantity_AbsorbedDose;
  Mirror_1(P: gp_Pnt2d): void;
  Mirrored_1(P: gp_Pnt2d): gp_Pnt2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Pnt2d;
  Rotate(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): void;
  Rotated(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): gp_Pnt2d;
  Scale(P: gp_Pnt2d, S: Quantity_AbsorbedDose): void;
  Scaled(P: gp_Pnt2d, S: Quantity_AbsorbedDose): gp_Pnt2d;
  Transform(T: gp_Trsf2d): void;
  Transformed(T: gp_Trsf2d): gp_Pnt2d;
  Translate_1(V: gp_Vec2d): void;
  Translated_1(V: gp_Vec2d): gp_Pnt2d;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): gp_Pnt2d;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class gp_Pnt2d_1 extends gp_Pnt2d {
    constructor();
  }

  export declare class gp_Pnt2d_2 extends gp_Pnt2d {
    constructor(Coord: gp_XY);
  }

  export declare class gp_Pnt2d_3 extends gp_Pnt2d {
    constructor(Xp: Quantity_AbsorbedDose, Yp: Quantity_AbsorbedDose);
  }

export declare class gp_XY {
  SetCoord_1(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetCoord_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  ChangeCoord(theIndex: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose): void;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  Modulus(): Quantity_AbsorbedDose;
  SquareModulus(): Quantity_AbsorbedDose;
  IsEqual(Other: gp_XY, Tolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Add(Other: gp_XY): void;
  Added(Other: gp_XY): gp_XY;
  Crossed(Right: gp_XY): Quantity_AbsorbedDose;
  CrossMagnitude(Right: gp_XY): Quantity_AbsorbedDose;
  CrossSquareMagnitude(Right: gp_XY): Quantity_AbsorbedDose;
  Divide(Scalar: Quantity_AbsorbedDose): void;
  Divided(Scalar: Quantity_AbsorbedDose): gp_XY;
  Dot(Other: gp_XY): Quantity_AbsorbedDose;
  Multiply_1(Scalar: Quantity_AbsorbedDose): void;
  Multiply_2(Other: gp_XY): void;
  Multiply_3(Matrix: gp_Mat2d): void;
  Multiplied_1(Scalar: Quantity_AbsorbedDose): gp_XY;
  Multiplied_2(Other: gp_XY): gp_XY;
  Multiplied_3(Matrix: gp_Mat2d): gp_XY;
  Normalize(): void;
  Normalized(): gp_XY;
  Reverse(): void;
  Reversed(): gp_XY;
  SetLinearForm_1(A1: Quantity_AbsorbedDose, XY1: gp_XY, A2: Quantity_AbsorbedDose, XY2: gp_XY): void;
  SetLinearForm_2(A1: Quantity_AbsorbedDose, XY1: gp_XY, A2: Quantity_AbsorbedDose, XY2: gp_XY, XY3: gp_XY): void;
  SetLinearForm_3(A1: Quantity_AbsorbedDose, XY1: gp_XY, XY2: gp_XY): void;
  SetLinearForm_4(XY1: gp_XY, XY2: gp_XY): void;
  Subtract(Right: gp_XY): void;
  Subtracted(Right: gp_XY): gp_XY;
  delete(): void;
}

  export declare class gp_XY_1 extends gp_XY {
    constructor();
  }

  export declare class gp_XY_2 extends gp_XY {
    constructor(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose);
  }

export declare class gp_Trsf2d {
  SetMirror_1(P: gp_Pnt2d): void;
  SetMirror_2(A: gp_Ax2d): void;
  SetRotation(P: gp_Pnt2d, Ang: Quantity_AbsorbedDose): void;
  SetScale(P: gp_Pnt2d, S: Quantity_AbsorbedDose): void;
  SetTransformation_1(FromSystem1: gp_Ax2d, ToSystem2: gp_Ax2d): void;
  SetTransformation_2(ToSystem: gp_Ax2d): void;
  SetTranslation_1(V: gp_Vec2d): void;
  SetTranslation_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  SetTranslationPart(V: gp_Vec2d): void;
  SetScaleFactor(S: Quantity_AbsorbedDose): void;
  IsNegative(): Standard_Boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): Quantity_AbsorbedDose;
  TranslationPart(): gp_XY;
  VectorialPart(): gp_Mat2d;
  HVectorialPart(): gp_Mat2d;
  RotationPart(): Quantity_AbsorbedDose;
  Value(Row: Graphic3d_ZLayerId, Col: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Invert(): void;
  Inverted(): gp_Trsf2d;
  Multiplied(T: gp_Trsf2d): gp_Trsf2d;
  Multiply(T: gp_Trsf2d): void;
  PreMultiply(T: gp_Trsf2d): void;
  Power(N: Graphic3d_ZLayerId): void;
  Powered(N: Graphic3d_ZLayerId): gp_Trsf2d;
  Transforms_1(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose): void;
  Transforms_2(Coord: gp_XY): void;
  SetValues(a11: Quantity_AbsorbedDose, a12: Quantity_AbsorbedDose, a13: Quantity_AbsorbedDose, a21: Quantity_AbsorbedDose, a22: Quantity_AbsorbedDose, a23: Quantity_AbsorbedDose): void;
  delete(): void;
}

  export declare class gp_Trsf2d_1 extends gp_Trsf2d {
    constructor();
  }

  export declare class gp_Trsf2d_2 extends gp_Trsf2d {
    constructor(T: gp_Trsf);
  }

export declare class gp_XYZ {
  SetCoord_1(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose, Z: Quantity_AbsorbedDose): void;
  SetCoord_2(Index: Graphic3d_ZLayerId, Xi: Quantity_AbsorbedDose): void;
  SetX(X: Quantity_AbsorbedDose): void;
  SetY(Y: Quantity_AbsorbedDose): void;
  SetZ(Z: Quantity_AbsorbedDose): void;
  Coord_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  ChangeCoord(theIndex: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Coord_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose, Z: Quantity_AbsorbedDose): void;
  GetData(): Quantity_AbsorbedDose;
  ChangeData(): Quantity_AbsorbedDose;
  X(): Quantity_AbsorbedDose;
  Y(): Quantity_AbsorbedDose;
  Z(): Quantity_AbsorbedDose;
  Modulus(): Quantity_AbsorbedDose;
  SquareModulus(): Quantity_AbsorbedDose;
  IsEqual(Other: gp_XYZ, Tolerance: Quantity_AbsorbedDose): Standard_Boolean;
  Add(Other: gp_XYZ): void;
  Added(Other: gp_XYZ): gp_XYZ;
  Cross(Right: gp_XYZ): void;
  Crossed(Right: gp_XYZ): gp_XYZ;
  CrossMagnitude(Right: gp_XYZ): Quantity_AbsorbedDose;
  CrossSquareMagnitude(Right: gp_XYZ): Quantity_AbsorbedDose;
  CrossCross(Coord1: gp_XYZ, Coord2: gp_XYZ): void;
  CrossCrossed(Coord1: gp_XYZ, Coord2: gp_XYZ): gp_XYZ;
  Divide(Scalar: Quantity_AbsorbedDose): void;
  Divided(Scalar: Quantity_AbsorbedDose): gp_XYZ;
  Dot(Other: gp_XYZ): Quantity_AbsorbedDose;
  DotCross(Coord1: gp_XYZ, Coord2: gp_XYZ): Quantity_AbsorbedDose;
  Multiply_1(Scalar: Quantity_AbsorbedDose): void;
  Multiply_2(Other: gp_XYZ): void;
  Multiply_3(Matrix: gp_Mat): void;
  Multiplied_1(Scalar: Quantity_AbsorbedDose): gp_XYZ;
  Multiplied_2(Other: gp_XYZ): gp_XYZ;
  Multiplied_3(Matrix: gp_Mat): gp_XYZ;
  Normalize(): void;
  Normalized(): gp_XYZ;
  Reverse(): void;
  Reversed(): gp_XYZ;
  Subtract(Right: gp_XYZ): void;
  Subtracted(Right: gp_XYZ): gp_XYZ;
  SetLinearForm_1(A1: Quantity_AbsorbedDose, XYZ1: gp_XYZ, A2: Quantity_AbsorbedDose, XYZ2: gp_XYZ, A3: Quantity_AbsorbedDose, XYZ3: gp_XYZ, XYZ4: gp_XYZ): void;
  SetLinearForm_2(A1: Quantity_AbsorbedDose, XYZ1: gp_XYZ, A2: Quantity_AbsorbedDose, XYZ2: gp_XYZ, A3: Quantity_AbsorbedDose, XYZ3: gp_XYZ): void;
  SetLinearForm_3(A1: Quantity_AbsorbedDose, XYZ1: gp_XYZ, A2: Quantity_AbsorbedDose, XYZ2: gp_XYZ, XYZ3: gp_XYZ): void;
  SetLinearForm_4(A1: Quantity_AbsorbedDose, XYZ1: gp_XYZ, A2: Quantity_AbsorbedDose, XYZ2: gp_XYZ): void;
  SetLinearForm_5(A1: Quantity_AbsorbedDose, XYZ1: gp_XYZ, XYZ2: gp_XYZ): void;
  SetLinearForm_6(XYZ1: gp_XYZ, XYZ2: gp_XYZ): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class gp_XYZ_1 extends gp_XYZ {
    constructor();
  }

  export declare class gp_XYZ_2 extends gp_XYZ {
    constructor(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose, Z: Quantity_AbsorbedDose);
  }

export declare class TColStd_Array1OfInteger {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: Standard_Integer): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  Move(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  First(): Standard_Integer;
  ChangeFirst(): Standard_Integer;
  Last(): Standard_Integer;
  ChangeLast(): Standard_Integer;
  Value(theIndex: Standard_Integer): Standard_Integer;
  ChangeValue(theIndex: Standard_Integer): Standard_Integer;
  SetValue(theIndex: Standard_Integer, theItem: Standard_Integer): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColStd_Array1OfInteger_1 extends TColStd_Array1OfInteger {
    constructor();
  }

  export declare class TColStd_Array1OfInteger_2 extends TColStd_Array1OfInteger {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColStd_Array1OfInteger_3 extends TColStd_Array1OfInteger {
    constructor(theOther: TColStd_Array1OfInteger);
  }

  export declare class TColStd_Array1OfInteger_4 extends TColStd_Array1OfInteger {
    constructor(theOther: TColStd_Array1OfInteger);
  }

  export declare class TColStd_Array1OfInteger_5 extends TColStd_Array1OfInteger {
    constructor(theBegin: Standard_Integer, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class TColStd_Array1OfReal {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: Standard_Real): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColStd_Array1OfReal): TColStd_Array1OfReal;
  Move(theOther: TColStd_Array1OfReal): TColStd_Array1OfReal;
  First(): Standard_Real;
  ChangeFirst(): Standard_Real;
  Last(): Standard_Real;
  ChangeLast(): Standard_Real;
  Value(theIndex: Standard_Integer): Standard_Real;
  ChangeValue(theIndex: Standard_Integer): Standard_Real;
  SetValue(theIndex: Standard_Integer, theItem: Standard_Real): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColStd_Array1OfReal_1 extends TColStd_Array1OfReal {
    constructor();
  }

  export declare class TColStd_Array1OfReal_2 extends TColStd_Array1OfReal {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColStd_Array1OfReal_3 extends TColStd_Array1OfReal {
    constructor(theOther: TColStd_Array1OfReal);
  }

  export declare class TColStd_Array1OfReal_4 extends TColStd_Array1OfReal {
    constructor(theOther: TColStd_Array1OfReal);
  }

  export declare class TColStd_Array1OfReal_5 extends TColStd_Array1OfReal {
    constructor(theBegin: Standard_Real, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class TColStd_Array1OfBoolean {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: Standard_Boolean): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColStd_Array1OfBoolean): TColStd_Array1OfBoolean;
  Move(theOther: TColStd_Array1OfBoolean): TColStd_Array1OfBoolean;
  First(): Standard_Boolean;
  ChangeFirst(): Standard_Boolean;
  Last(): Standard_Boolean;
  ChangeLast(): Standard_Boolean;
  Value(theIndex: Standard_Integer): Standard_Boolean;
  ChangeValue(theIndex: Standard_Integer): Standard_Boolean;
  SetValue(theIndex: Standard_Integer, theItem: Standard_Boolean): void;
  Resize(theLower: Standard_Integer, theUpper: Standard_Integer, theToCopyData: Standard_Boolean): void;
  delete(): void;
}

  export declare class TColStd_Array1OfBoolean_1 extends TColStd_Array1OfBoolean {
    constructor();
  }

  export declare class TColStd_Array1OfBoolean_2 extends TColStd_Array1OfBoolean {
    constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
  }

  export declare class TColStd_Array1OfBoolean_3 extends TColStd_Array1OfBoolean {
    constructor(theOther: TColStd_Array1OfBoolean);
  }

  export declare class TColStd_Array1OfBoolean_4 extends TColStd_Array1OfBoolean {
    constructor(theOther: TColStd_Array1OfBoolean);
  }

  export declare class TColStd_Array1OfBoolean_5 extends TColStd_Array1OfBoolean {
    constructor(theBegin: Standard_Boolean, theLower: Standard_Integer, theUpper: Standard_Integer);
  }

export declare class STEPControl_Writer {
  SetTolerance(Tol: Quantity_AbsorbedDose): void;
  UnsetTolerance(): void;
  SetWS(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean): void;
  WS(): Handle_XSControl_WorkSession;
  Model(newone: Standard_Boolean): Handle_StepData_StepModel;
  Transfer(sh: TopoDS_Shape, mode: STEPControl_StepModelType, compgraph: Standard_Boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Write(filename: Standard_CString): IFSelect_ReturnStatus;
  PrintStatsTransfer(what: Graphic3d_ZLayerId, mode: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class STEPControl_Writer_1 extends STEPControl_Writer {
    constructor();
  }

  export declare class STEPControl_Writer_2 extends STEPControl_Writer {
    constructor(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean);
  }

export declare class STEPControl_Reader extends XSControl_Reader {
  StepModel(): Handle_StepData_StepModel;
  TransferRoot(num: Graphic3d_ZLayerId, theProgress: Message_ProgressRange): Standard_Boolean;
  NbRootsForTransfer(): Graphic3d_ZLayerId;
  FileUnits(theUnitLengthNames: TColStd_SequenceOfAsciiString, theUnitAngleNames: TColStd_SequenceOfAsciiString, theUnitSolidAngleNames: TColStd_SequenceOfAsciiString): void;
  delete(): void;
}

  export declare class STEPControl_Reader_1 extends STEPControl_Reader {
    constructor();
  }

  export declare class STEPControl_Reader_2 extends STEPControl_Reader {
    constructor(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean);
  }

export declare type STEPControl_StepModelType = {
  STEPControl_AsIs: {};
  STEPControl_ManifoldSolidBrep: {};
  STEPControl_BrepWithVoids: {};
  STEPControl_FacetedBrep: {};
  STEPControl_FacetedBrepAndBrepWithVoids: {};
  STEPControl_ShellBasedSurfaceModel: {};
  STEPControl_GeometricCurveSet: {};
  STEPControl_Hybrid: {};
}

export declare class BRepLib {
  constructor();
  static Precision_1(P: Quantity_AbsorbedDose): void;
  static Precision_2(): Quantity_AbsorbedDose;
  static Plane_1(P: Handle_Geom_Plane): void;
  static Plane_2(): Handle_Geom_Plane;
  static CheckSameRange(E: TopoDS_Edge, Confusion: Quantity_AbsorbedDose): Standard_Boolean;
  static SameRange(E: TopoDS_Edge, Tolerance: Quantity_AbsorbedDose): void;
  static BuildCurve3d(E: TopoDS_Edge, Tolerance: Quantity_AbsorbedDose, Continuity: GeomAbs_Shape, MaxDegree: Graphic3d_ZLayerId, MaxSegment: Graphic3d_ZLayerId): Standard_Boolean;
  static BuildCurves3d_1(S: TopoDS_Shape, Tolerance: Quantity_AbsorbedDose, Continuity: GeomAbs_Shape, MaxDegree: Graphic3d_ZLayerId, MaxSegment: Graphic3d_ZLayerId): Standard_Boolean;
  static BuildCurves3d_2(S: TopoDS_Shape): Standard_Boolean;
  static BuildPCurveForEdgeOnPlane_1(theE: TopoDS_Edge, theF: TopoDS_Face): void;
  static BuildPCurveForEdgeOnPlane_2(theE: TopoDS_Edge, theF: TopoDS_Face, aC2D: Handle_Geom2d_Curve, bToUpdate: Standard_Boolean): void;
  static UpdateEdgeTol(E: TopoDS_Edge, MinToleranceRequest: Quantity_AbsorbedDose, MaxToleranceToCheck: Quantity_AbsorbedDose): Standard_Boolean;
  static UpdateEdgeTolerance(S: TopoDS_Shape, MinToleranceRequest: Quantity_AbsorbedDose, MaxToleranceToCheck: Quantity_AbsorbedDose): Standard_Boolean;
  static SameParameter_1(theEdge: TopoDS_Edge, Tolerance: Quantity_AbsorbedDose): void;
  static SameParameter_2(theEdge: TopoDS_Edge, theTolerance: Quantity_AbsorbedDose, theNewTol: Quantity_AbsorbedDose, IsUseOldEdge: Standard_Boolean): TopoDS_Edge;
  static SameParameter_3(S: TopoDS_Shape, Tolerance: Quantity_AbsorbedDose, forced: Standard_Boolean): void;
  static SameParameter_4(S: TopoDS_Shape, theReshaper: BRepTools_ReShape, Tolerance: Quantity_AbsorbedDose, forced: Standard_Boolean): void;
  static UpdateTolerances_1(S: TopoDS_Shape, verifyFaceTolerance: Standard_Boolean): void;
  static UpdateTolerances_2(S: TopoDS_Shape, theReshaper: BRepTools_ReShape, verifyFaceTolerance: Standard_Boolean): void;
  static UpdateInnerTolerances(S: TopoDS_Shape): void;
  static OrientClosedSolid(solid: TopoDS_Solid): Standard_Boolean;
  static EncodeRegularity_1(S: TopoDS_Shape, TolAng: Quantity_AbsorbedDose): void;
  static EncodeRegularity_2(S: TopoDS_Shape, LE: TopTools_ListOfShape, TolAng: Quantity_AbsorbedDose): void;
  static EncodeRegularity_3(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face, TolAng: Quantity_AbsorbedDose): void;
  static SortFaces(S: TopoDS_Shape, LF: TopTools_ListOfShape): void;
  static ReverseSortFaces(S: TopoDS_Shape, LF: TopTools_ListOfShape): void;
  static EnsureNormalConsistency(S: TopoDS_Shape, theAngTol: Quantity_AbsorbedDose, ForceComputeNormals: Standard_Boolean): Standard_Boolean;
  static BoundingVertex(theLV: TopoDS_ListOfShape, theNewCenter: gp_Pnt, theNewTol: Quantity_AbsorbedDose): void;
  static FindValidRange_1(theCurve: Adaptor3d_Curve, theTolE: Quantity_AbsorbedDose, theParV1: Quantity_AbsorbedDose, thePntV1: gp_Pnt, theTolV1: Quantity_AbsorbedDose, theParV2: Quantity_AbsorbedDose, thePntV2: gp_Pnt, theTolV2: Quantity_AbsorbedDose, theFirst: Quantity_AbsorbedDose, theLast: Quantity_AbsorbedDose): Standard_Boolean;
  static FindValidRange_2(theEdge: TopoDS_Edge, theFirst: Quantity_AbsorbedDose, theLast: Quantity_AbsorbedDose): Standard_Boolean;
  static ExtendFace(theF: TopoDS_Face, theExtVal: Quantity_AbsorbedDose, theExtUMin: Standard_Boolean, theExtUMax: Standard_Boolean, theExtVMin: Standard_Boolean, theExtVMax: Standard_Boolean, theFExtended: TopoDS_Face): void;
  delete(): void;
}

export declare class BRepPrimAPI_MakeTorus extends BRepPrimAPI_MakeOneAxis {
  OneAxis(): Standard_Address;
  Torus(): BRepPrim_Torus;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeTorus_1 extends BRepPrimAPI_MakeTorus {
    constructor(R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_2 extends BRepPrimAPI_MakeTorus {
    constructor(R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_3 extends BRepPrimAPI_MakeTorus {
    constructor(R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_4 extends BRepPrimAPI_MakeTorus {
    constructor(R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_5 extends BRepPrimAPI_MakeTorus {
    constructor(Axes: gp_Ax2, R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_6 extends BRepPrimAPI_MakeTorus {
    constructor(Axes: gp_Ax2, R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_7 extends BRepPrimAPI_MakeTorus {
    constructor(Axes: gp_Ax2, R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeTorus_8 extends BRepPrimAPI_MakeTorus {
    constructor(Axes: gp_Ax2, R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

export declare class BRepPrimAPI_MakeRevol extends BRepPrimAPI_MakeSweep {
  Revol(): BRepSweep_Revol;
  Build(): void;
  FirstShape_1(): TopoDS_Shape;
  LastShape_1(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  FirstShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  LastShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  HasDegenerated(): Standard_Boolean;
  Degenerated(): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeRevol_1 extends BRepPrimAPI_MakeRevol {
    constructor(S: TopoDS_Shape, A: gp_Ax1, D: Quantity_AbsorbedDose, Copy: Standard_Boolean);
  }

  export declare class BRepPrimAPI_MakeRevol_2 extends BRepPrimAPI_MakeRevol {
    constructor(S: TopoDS_Shape, A: gp_Ax1, Copy: Standard_Boolean);
  }

export declare class BRepPrimAPI_MakeOneAxis extends BRepBuilderAPI_MakeShape {
  OneAxis(): Standard_Address;
  Build(): void;
  Face(): TopoDS_Face;
  Shell(): TopoDS_Shell;
  Solid(): TopoDS_Solid;
  delete(): void;
}

export declare class BRepPrimAPI_MakeSphere extends BRepPrimAPI_MakeOneAxis {
  OneAxis(): Standard_Address;
  Sphere(): BRepPrim_Sphere;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeSphere_1 extends BRepPrimAPI_MakeSphere {
    constructor(R: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_2 extends BRepPrimAPI_MakeSphere {
    constructor(R: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_3 extends BRepPrimAPI_MakeSphere {
    constructor(R: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_4 extends BRepPrimAPI_MakeSphere {
    constructor(R: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose, angle3: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_5 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_6 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_7 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_8 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose, angle3: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_9 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_10 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_11 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeSphere_12 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Quantity_AbsorbedDose, angle1: Quantity_AbsorbedDose, angle2: Quantity_AbsorbedDose, angle3: Quantity_AbsorbedDose);
  }

export declare class BRepPrimAPI_MakeCylinder extends BRepPrimAPI_MakeOneAxis {
  OneAxis(): Standard_Address;
  Cylinder(): BRepPrim_Cylinder;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeCylinder_1 extends BRepPrimAPI_MakeCylinder {
    constructor(R: Quantity_AbsorbedDose, H: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeCylinder_2 extends BRepPrimAPI_MakeCylinder {
    constructor(R: Quantity_AbsorbedDose, H: Quantity_AbsorbedDose, Angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeCylinder_3 extends BRepPrimAPI_MakeCylinder {
    constructor(Axes: gp_Ax2, R: Quantity_AbsorbedDose, H: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeCylinder_4 extends BRepPrimAPI_MakeCylinder {
    constructor(Axes: gp_Ax2, R: Quantity_AbsorbedDose, H: Quantity_AbsorbedDose, Angle: Quantity_AbsorbedDose);
  }

export declare class BRepPrimAPI_MakeSweep extends BRepBuilderAPI_MakeShape {
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  delete(): void;
}

export declare class BRepPrimAPI_MakePrism extends BRepPrimAPI_MakeSweep {
  Prism(): BRepSweep_Prism;
  Build(): void;
  FirstShape_1(): TopoDS_Shape;
  LastShape_1(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  FirstShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  LastShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  delete(): void;
}

  export declare class BRepPrimAPI_MakePrism_1 extends BRepPrimAPI_MakePrism {
    constructor(S: TopoDS_Shape, V: gp_Vec, Copy: Standard_Boolean, Canonize: Standard_Boolean);
  }

  export declare class BRepPrimAPI_MakePrism_2 extends BRepPrimAPI_MakePrism {
    constructor(S: TopoDS_Shape, D: gp_Dir, Inf: Standard_Boolean, Copy: Standard_Boolean, Canonize: Standard_Boolean);
  }

export declare class BRepPrimAPI_MakeBox extends BRepBuilderAPI_MakeShape {
  Init_1(theDX: Quantity_AbsorbedDose, theDY: Quantity_AbsorbedDose, theDZ: Quantity_AbsorbedDose): void;
  Init_2(thePnt: gp_Pnt, theDX: Quantity_AbsorbedDose, theDY: Quantity_AbsorbedDose, theDZ: Quantity_AbsorbedDose): void;
  Init_3(thePnt1: gp_Pnt, thePnt2: gp_Pnt): void;
  Init_4(theAxes: gp_Ax2, theDX: Quantity_AbsorbedDose, theDY: Quantity_AbsorbedDose, theDZ: Quantity_AbsorbedDose): void;
  Wedge(): BRepPrim_Wedge;
  Build(): void;
  Shell(): TopoDS_Shell;
  Solid(): TopoDS_Solid;
  BottomFace(): TopoDS_Face;
  BackFace(): TopoDS_Face;
  FrontFace(): TopoDS_Face;
  LeftFace(): TopoDS_Face;
  RightFace(): TopoDS_Face;
  TopFace(): TopoDS_Face;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeBox_1 extends BRepPrimAPI_MakeBox {
    constructor();
  }

  export declare class BRepPrimAPI_MakeBox_2 extends BRepPrimAPI_MakeBox {
    constructor(dx: Quantity_AbsorbedDose, dy: Quantity_AbsorbedDose, dz: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeBox_3 extends BRepPrimAPI_MakeBox {
    constructor(P: gp_Pnt, dx: Quantity_AbsorbedDose, dy: Quantity_AbsorbedDose, dz: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeBox_4 extends BRepPrimAPI_MakeBox {
    constructor(P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepPrimAPI_MakeBox_5 extends BRepPrimAPI_MakeBox {
    constructor(Axes: gp_Ax2, dx: Quantity_AbsorbedDose, dy: Quantity_AbsorbedDose, dz: Quantity_AbsorbedDose);
  }

export declare class BRepPrimAPI_MakeRevolution extends BRepPrimAPI_MakeOneAxis {
  OneAxis(): Standard_Address;
  Revolution(): BRepPrim_Revolution;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeRevolution_1 extends BRepPrimAPI_MakeRevolution {
    constructor(Meridian: Handle_Geom_Curve);
  }

  export declare class BRepPrimAPI_MakeRevolution_2 extends BRepPrimAPI_MakeRevolution {
    constructor(Meridian: Handle_Geom_Curve, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeRevolution_3 extends BRepPrimAPI_MakeRevolution {
    constructor(Meridian: Handle_Geom_Curve, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeRevolution_4 extends BRepPrimAPI_MakeRevolution {
    constructor(Meridian: Handle_Geom_Curve, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeRevolution_5 extends BRepPrimAPI_MakeRevolution {
    constructor(Axes: gp_Ax2, Meridian: Handle_Geom_Curve);
  }

  export declare class BRepPrimAPI_MakeRevolution_6 extends BRepPrimAPI_MakeRevolution {
    constructor(Axes: gp_Ax2, Meridian: Handle_Geom_Curve, angle: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeRevolution_7 extends BRepPrimAPI_MakeRevolution {
    constructor(Axes: gp_Ax2, Meridian: Handle_Geom_Curve, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose);
  }

  export declare class BRepPrimAPI_MakeRevolution_8 extends BRepPrimAPI_MakeRevolution {
    constructor(Axes: gp_Ax2, Meridian: Handle_Geom_Curve, VMin: Quantity_AbsorbedDose, VMax: Quantity_AbsorbedDose, angle: Quantity_AbsorbedDose);
  }

export declare class TopExp_Explorer {
  Init(S: TopoDS_Shape, ToFind: TopAbs_ShapeEnum, ToAvoid: TopAbs_ShapeEnum): void;
  More(): Standard_Boolean;
  Next(): void;
  Value(): TopoDS_Shape;
  Current(): TopoDS_Shape;
  ReInit(): void;
  Depth(): Graphic3d_ZLayerId;
  Clear(): void;
  Destroy(): void;
  delete(): void;
}

  export declare class TopExp_Explorer_1 extends TopExp_Explorer {
    constructor();
  }

  export declare class TopExp_Explorer_2 extends TopExp_Explorer {
    constructor(S: TopoDS_Shape, ToFind: TopAbs_ShapeEnum, ToAvoid: TopAbs_ShapeEnum);
  }

export declare class BRepFilletAPI_MakeChamfer extends BRepFilletAPI_LocalOperation {
  constructor(S: TopoDS_Shape)
  Add_1(E: TopoDS_Edge): void;
  Add_2(Dis: Quantity_AbsorbedDose, E: TopoDS_Edge): void;
  SetDist(Dis: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, F: TopoDS_Face): void;
  GetDist(IC: Graphic3d_ZLayerId, Dis: Quantity_AbsorbedDose): void;
  Add_3(Dis1: Quantity_AbsorbedDose, Dis2: Quantity_AbsorbedDose, E: TopoDS_Edge, F: TopoDS_Face): void;
  SetDists(Dis1: Quantity_AbsorbedDose, Dis2: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, F: TopoDS_Face): void;
  Dists(IC: Graphic3d_ZLayerId, Dis1: Quantity_AbsorbedDose, Dis2: Quantity_AbsorbedDose): void;
  AddDA(Dis: Quantity_AbsorbedDose, Angle: Quantity_AbsorbedDose, E: TopoDS_Edge, F: TopoDS_Face): void;
  SetDistAngle(Dis: Quantity_AbsorbedDose, Angle: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, F: TopoDS_Face): void;
  GetDistAngle(IC: Graphic3d_ZLayerId, Dis: Quantity_AbsorbedDose, Angle: Quantity_AbsorbedDose): void;
  SetMode(theMode: ChFiDS_ChamfMode): void;
  IsSymetric(IC: Graphic3d_ZLayerId): Standard_Boolean;
  IsTwoDistances(IC: Graphic3d_ZLayerId): Standard_Boolean;
  IsDistanceAngle(IC: Graphic3d_ZLayerId): Standard_Boolean;
  ResetContour(IC: Graphic3d_ZLayerId): void;
  NbContours(): Graphic3d_ZLayerId;
  Contour(E: TopoDS_Edge): Graphic3d_ZLayerId;
  NbEdges(I: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Edge(I: Graphic3d_ZLayerId, J: Graphic3d_ZLayerId): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  FirstVertex(IC: Graphic3d_ZLayerId): TopoDS_Vertex;
  LastVertex(IC: Graphic3d_ZLayerId): TopoDS_Vertex;
  Abscissa(IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): Quantity_AbsorbedDose;
  RelativeAbscissa(IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): Quantity_AbsorbedDose;
  ClosedAndTangent(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Closed(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Build(): void;
  Reset(): void;
  Builder(): Handle_TopOpeBRepBuild_HBuilder;
  Generated(EorV: TopoDS_Shape): TopTools_ListOfShape;
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(F: TopoDS_Shape): Standard_Boolean;
  Simulate(IC: Graphic3d_ZLayerId): void;
  NbSurf(IC: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Sect(IC: Graphic3d_ZLayerId, IS: Graphic3d_ZLayerId): Handle_ChFiDS_SecHArray1;
  delete(): void;
}

export declare class BRepFilletAPI_MakeFillet extends BRepFilletAPI_LocalOperation {
  constructor(S: TopoDS_Shape, FShape: ChFi3d_FilletShape)
  SetParams(Tang: Quantity_AbsorbedDose, Tesp: Quantity_AbsorbedDose, T2d: Quantity_AbsorbedDose, TApp3d: Quantity_AbsorbedDose, TolApp2d: Quantity_AbsorbedDose, Fleche: Quantity_AbsorbedDose): void;
  SetContinuity(InternalContinuity: GeomAbs_Shape, AngularTolerance: Quantity_AbsorbedDose): void;
  Add_1(E: TopoDS_Edge): void;
  Add_2(Radius: Quantity_AbsorbedDose, E: TopoDS_Edge): void;
  Add_3(R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, E: TopoDS_Edge): void;
  Add_4(L: Handle_Law_Function, E: TopoDS_Edge): void;
  Add_5(UandR: TColgp_Array1OfPnt2d, E: TopoDS_Edge): void;
  SetRadius_1(Radius: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, IinC: Graphic3d_ZLayerId): void;
  SetRadius_2(R1: Quantity_AbsorbedDose, R2: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, IinC: Graphic3d_ZLayerId): void;
  SetRadius_3(L: Handle_Law_Function, IC: Graphic3d_ZLayerId, IinC: Graphic3d_ZLayerId): void;
  SetRadius_4(UandR: TColgp_Array1OfPnt2d, IC: Graphic3d_ZLayerId, IinC: Graphic3d_ZLayerId): void;
  ResetContour(IC: Graphic3d_ZLayerId): void;
  IsConstant_1(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Radius_1(IC: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  IsConstant_2(IC: Graphic3d_ZLayerId, E: TopoDS_Edge): Standard_Boolean;
  Radius_2(IC: Graphic3d_ZLayerId, E: TopoDS_Edge): Quantity_AbsorbedDose;
  SetRadius_5(Radius: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, E: TopoDS_Edge): void;
  SetRadius_6(Radius: Quantity_AbsorbedDose, IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): void;
  GetBounds(IC: Graphic3d_ZLayerId, E: TopoDS_Edge, F: Quantity_AbsorbedDose, L: Quantity_AbsorbedDose): Standard_Boolean;
  GetLaw(IC: Graphic3d_ZLayerId, E: TopoDS_Edge): Handle_Law_Function;
  SetLaw(IC: Graphic3d_ZLayerId, E: TopoDS_Edge, L: Handle_Law_Function): void;
  SetFilletShape(FShape: ChFi3d_FilletShape): void;
  GetFilletShape(): ChFi3d_FilletShape;
  NbContours(): Graphic3d_ZLayerId;
  Contour(E: TopoDS_Edge): Graphic3d_ZLayerId;
  NbEdges(I: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Edge(I: Graphic3d_ZLayerId, J: Graphic3d_ZLayerId): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  FirstVertex(IC: Graphic3d_ZLayerId): TopoDS_Vertex;
  LastVertex(IC: Graphic3d_ZLayerId): TopoDS_Vertex;
  Abscissa(IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): Quantity_AbsorbedDose;
  RelativeAbscissa(IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): Quantity_AbsorbedDose;
  ClosedAndTangent(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Closed(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Build(): void;
  Reset(): void;
  Builder(): Handle_TopOpeBRepBuild_HBuilder;
  Generated(EorV: TopoDS_Shape): TopTools_ListOfShape;
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(F: TopoDS_Shape): Standard_Boolean;
  NbSurfaces(): Graphic3d_ZLayerId;
  NewFaces(I: Graphic3d_ZLayerId): TopTools_ListOfShape;
  Simulate(IC: Graphic3d_ZLayerId): void;
  NbSurf(IC: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Sect(IC: Graphic3d_ZLayerId, IS: Graphic3d_ZLayerId): Handle_ChFiDS_SecHArray1;
  NbFaultyContours(): Graphic3d_ZLayerId;
  FaultyContour(I: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  NbComputedSurfaces(IC: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  ComputedSurface(IC: Graphic3d_ZLayerId, IS: Graphic3d_ZLayerId): Handle_Geom_Surface;
  NbFaultyVertices(): Graphic3d_ZLayerId;
  FaultyVertex(IV: Graphic3d_ZLayerId): TopoDS_Vertex;
  HasResult(): Standard_Boolean;
  BadShape(): TopoDS_Shape;
  StripeStatus(IC: Graphic3d_ZLayerId): ChFiDS_ErrorStatus;
  delete(): void;
}

export declare class BRepFilletAPI_LocalOperation extends BRepBuilderAPI_MakeShape {
  Add(E: TopoDS_Edge): void;
  ResetContour(IC: Graphic3d_ZLayerId): void;
  NbContours(): Graphic3d_ZLayerId;
  Contour(E: TopoDS_Edge): Graphic3d_ZLayerId;
  NbEdges(I: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Edge(I: Graphic3d_ZLayerId, J: Graphic3d_ZLayerId): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  FirstVertex(IC: Graphic3d_ZLayerId): TopoDS_Vertex;
  LastVertex(IC: Graphic3d_ZLayerId): TopoDS_Vertex;
  Abscissa(IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): Quantity_AbsorbedDose;
  RelativeAbscissa(IC: Graphic3d_ZLayerId, V: TopoDS_Vertex): Quantity_AbsorbedDose;
  ClosedAndTangent(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Closed(IC: Graphic3d_ZLayerId): Standard_Boolean;
  Reset(): void;
  Simulate(IC: Graphic3d_ZLayerId): void;
  NbSurf(IC: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Sect(IC: Graphic3d_ZLayerId, IS: Graphic3d_ZLayerId): Handle_ChFiDS_SecHArray1;
  delete(): void;
}

export declare class Bnd_Box2d {
  constructor()
  SetWhole(): void;
  SetVoid(): void;
  Set_1(thePnt: gp_Pnt2d): void;
  Set_2(thePnt: gp_Pnt2d, theDir: gp_Dir2d): void;
  Update_1(aXmin: Quantity_AbsorbedDose, aYmin: Quantity_AbsorbedDose, aXmax: Quantity_AbsorbedDose, aYmax: Quantity_AbsorbedDose): void;
  Update_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose): void;
  GetGap(): Quantity_AbsorbedDose;
  SetGap(Tol: Quantity_AbsorbedDose): void;
  Enlarge(theTol: Quantity_AbsorbedDose): void;
  Get(aXmin: Quantity_AbsorbedDose, aYmin: Quantity_AbsorbedDose, aXmax: Quantity_AbsorbedDose, aYmax: Quantity_AbsorbedDose): void;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  IsOpenXmin(): Standard_Boolean;
  IsOpenXmax(): Standard_Boolean;
  IsOpenYmin(): Standard_Boolean;
  IsOpenYmax(): Standard_Boolean;
  IsWhole(): Standard_Boolean;
  IsVoid(): Standard_Boolean;
  Transformed(T: gp_Trsf2d): Bnd_Box2d;
  Add_1(Other: Bnd_Box2d): void;
  Add_2(thePnt: gp_Pnt2d): void;
  Add_3(thePnt: gp_Pnt2d, theDir: gp_Dir2d): void;
  Add_4(D: gp_Dir2d): void;
  IsOut_1(P: gp_Pnt2d): Standard_Boolean;
  IsOut_2(Other: Bnd_Box2d): Standard_Boolean;
  IsOut_3(theOther: Bnd_Box2d, theTrsf: gp_Trsf2d): Standard_Boolean;
  IsOut_4(T1: gp_Trsf2d, Other: Bnd_Box2d, T2: gp_Trsf2d): Standard_Boolean;
  Dump(): void;
  SquareExtent(): Quantity_AbsorbedDose;
  delete(): void;
}

export declare class Bnd_Box {
  SetWhole(): void;
  SetVoid(): void;
  Set_1(P: gp_Pnt): void;
  Set_2(P: gp_Pnt, D: gp_Dir): void;
  Update_1(aXmin: Quantity_AbsorbedDose, aYmin: Quantity_AbsorbedDose, aZmin: Quantity_AbsorbedDose, aXmax: Quantity_AbsorbedDose, aYmax: Quantity_AbsorbedDose, aZmax: Quantity_AbsorbedDose): void;
  Update_2(X: Quantity_AbsorbedDose, Y: Quantity_AbsorbedDose, Z: Quantity_AbsorbedDose): void;
  GetGap(): Quantity_AbsorbedDose;
  SetGap(Tol: Quantity_AbsorbedDose): void;
  Enlarge(Tol: Quantity_AbsorbedDose): void;
  Get(theXmin: Quantity_AbsorbedDose, theYmin: Quantity_AbsorbedDose, theZmin: Quantity_AbsorbedDose, theXmax: Quantity_AbsorbedDose, theYmax: Quantity_AbsorbedDose, theZmax: Quantity_AbsorbedDose): void;
  CornerMin(): gp_Pnt;
  CornerMax(): gp_Pnt;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  OpenZmin(): void;
  OpenZmax(): void;
  IsOpen(): Standard_Boolean;
  IsOpenXmin(): Standard_Boolean;
  IsOpenXmax(): Standard_Boolean;
  IsOpenYmin(): Standard_Boolean;
  IsOpenYmax(): Standard_Boolean;
  IsOpenZmin(): Standard_Boolean;
  IsOpenZmax(): Standard_Boolean;
  IsWhole(): Standard_Boolean;
  IsVoid(): Standard_Boolean;
  IsXThin(tol: Quantity_AbsorbedDose): Standard_Boolean;
  IsYThin(tol: Quantity_AbsorbedDose): Standard_Boolean;
  IsZThin(tol: Quantity_AbsorbedDose): Standard_Boolean;
  IsThin(tol: Quantity_AbsorbedDose): Standard_Boolean;
  Transformed(T: gp_Trsf): Bnd_Box;
  Add_1(Other: Bnd_Box): void;
  Add_2(P: gp_Pnt): void;
  Add_3(P: gp_Pnt, D: gp_Dir): void;
  Add_4(D: gp_Dir): void;
  IsOut_1(P: gp_Pnt): Standard_Boolean;
  IsOut_2(L: gp_Lin): Standard_Boolean;
  IsOut_3(P: gp_Pln): Standard_Boolean;
  IsOut_4(Other: Bnd_Box): Standard_Boolean;
  IsOut_5(Other: Bnd_Box, T: gp_Trsf): Standard_Boolean;
  IsOut_6(T1: gp_Trsf, Other: Bnd_Box, T2: gp_Trsf): Standard_Boolean;
  IsOut_7(P1: gp_Pnt, P2: gp_Pnt, D: gp_Dir): Standard_Boolean;
  Distance(Other: Bnd_Box): Quantity_AbsorbedDose;
  Dump(): void;
  SquareExtent(): Quantity_AbsorbedDose;
  FinitePart(): Bnd_Box;
  HasFinitePart(): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

  export declare class Bnd_Box_1 extends Bnd_Box {
    constructor();
  }

  export declare class Bnd_Box_2 extends Bnd_Box {
    constructor(theMin: gp_Pnt, theMax: gp_Pnt);
  }

export declare class Bnd_OBB {
  ReBuild(theListOfPoints: TColgp_Array1OfPnt, theListOfTolerances: TColStd_Array1OfReal, theIsOptimal: Standard_Boolean): void;
  SetCenter(theCenter: gp_Pnt): void;
  SetXComponent(theXDirection: gp_Dir, theHXSize: Quantity_AbsorbedDose): void;
  SetYComponent(theYDirection: gp_Dir, theHYSize: Quantity_AbsorbedDose): void;
  SetZComponent(theZDirection: gp_Dir, theHZSize: Quantity_AbsorbedDose): void;
  Position(): gp_Ax3;
  Center(): gp_XYZ;
  XDirection(): gp_XYZ;
  YDirection(): gp_XYZ;
  ZDirection(): gp_XYZ;
  XHSize(): Quantity_AbsorbedDose;
  YHSize(): Quantity_AbsorbedDose;
  ZHSize(): Quantity_AbsorbedDose;
  IsVoid(): Standard_Boolean;
  SetVoid(): void;
  SetAABox(theFlag: Standard_Boolean): void;
  IsAABox(): Standard_Boolean;
  Enlarge(theGapAdd: Quantity_AbsorbedDose): void;
  GetVertex(theP: gp_Pnt [8]): Standard_Boolean;
  SquareExtent(): Quantity_AbsorbedDose;
  IsOut_1(theOther: Bnd_OBB): Standard_Boolean;
  IsOut_2(theP: gp_Pnt): Standard_Boolean;
  IsCompletelyInside(theOther: Bnd_OBB): Standard_Boolean;
  Add_1(theOther: Bnd_OBB): void;
  Add_2(theP: gp_Pnt): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

  export declare class Bnd_OBB_1 extends Bnd_OBB {
    constructor();
  }

  export declare class Bnd_OBB_2 extends Bnd_OBB {
    constructor(theCenter: gp_Pnt, theXDirection: gp_Dir, theYDirection: gp_Dir, theZDirection: gp_Dir, theHXSize: Quantity_AbsorbedDose, theHYSize: Quantity_AbsorbedDose, theHZSize: Quantity_AbsorbedDose);
  }

  export declare class Bnd_OBB_3 extends Bnd_OBB {
    constructor(theBox: Bnd_Box);
  }

export declare class Geom2dAPI_ProjectPointOnCurve {
  Init_1(P: gp_Pnt2d, Curve: Handle_Geom2d_Curve): void;
  Init_2(P: gp_Pnt2d, Curve: Handle_Geom2d_Curve, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose): void;
  NbPoints(): Graphic3d_ZLayerId;
  Point(Index: Graphic3d_ZLayerId): gp_Pnt2d;
  Parameter_1(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  Parameter_2(Index: Graphic3d_ZLayerId, U: Quantity_AbsorbedDose): void;
  Distance(Index: Graphic3d_ZLayerId): Quantity_AbsorbedDose;
  NearestPoint(): gp_Pnt2d;
  LowerDistanceParameter(): Quantity_AbsorbedDose;
  LowerDistance(): Quantity_AbsorbedDose;
  Extrema(): Extrema_ExtPC2d;
  delete(): void;
}

  export declare class Geom2dAPI_ProjectPointOnCurve_1 extends Geom2dAPI_ProjectPointOnCurve {
    constructor();
  }

  export declare class Geom2dAPI_ProjectPointOnCurve_2 extends Geom2dAPI_ProjectPointOnCurve {
    constructor(P: gp_Pnt2d, Curve: Handle_Geom2d_Curve);
  }

  export declare class Geom2dAPI_ProjectPointOnCurve_3 extends Geom2dAPI_ProjectPointOnCurve {
    constructor(P: gp_Pnt2d, Curve: Handle_Geom2d_Curve, Umin: Quantity_AbsorbedDose, Usup: Quantity_AbsorbedDose);
  }

export declare class Geom2dAPI_PointsToBSpline {
  Init_1(Points: TColgp_Array1OfPnt2d, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose): void;
  Init_2(YValues: TColStd_Array1OfReal, X0: Quantity_AbsorbedDose, DX: Quantity_AbsorbedDose, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose): void;
  Init_3(Points: TColgp_Array1OfPnt2d, ParType: Approx_ParametrizationType, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose): void;
  Init_4(Points: TColgp_Array1OfPnt2d, Parameters: TColStd_Array1OfReal, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose): void;
  Init_5(Points: TColgp_Array1OfPnt2d, Weight1: Quantity_AbsorbedDose, Weight2: Quantity_AbsorbedDose, Weight3: Quantity_AbsorbedDose, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose): void;
  Curve(): Handle_Geom2d_BSplineCurve;
  IsDone(): Standard_Boolean;
  delete(): void;
}

  export declare class Geom2dAPI_PointsToBSpline_1 extends Geom2dAPI_PointsToBSpline {
    constructor();
  }

  export declare class Geom2dAPI_PointsToBSpline_2 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose);
  }

  export declare class Geom2dAPI_PointsToBSpline_3 extends Geom2dAPI_PointsToBSpline {
    constructor(YValues: TColStd_Array1OfReal, X0: Quantity_AbsorbedDose, DX: Quantity_AbsorbedDose, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose);
  }

  export declare class Geom2dAPI_PointsToBSpline_4 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, ParType: Approx_ParametrizationType, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose);
  }

  export declare class Geom2dAPI_PointsToBSpline_5 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, Parameters: TColStd_Array1OfReal, DegMin: Graphic3d_ZLayerId, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol2D: Quantity_AbsorbedDose);
  }

  export declare class Geom2dAPI_PointsToBSpline_6 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, Weight1: Quantity_AbsorbedDose, Weight2: Quantity_AbsorbedDose, Weight3: Quantity_AbsorbedDose, DegMax: Graphic3d_ZLayerId, Continuity: GeomAbs_Shape, Tol3D: Quantity_AbsorbedDose);
  }

export declare class Geom2dAPI_InterCurveCurve {
  Init_1(C1: Handle_Geom2d_Curve, C2: Handle_Geom2d_Curve, Tol: Quantity_AbsorbedDose): void;
  Init_2(C1: Handle_Geom2d_Curve, Tol: Quantity_AbsorbedDose): void;
  NbPoints(): Graphic3d_ZLayerId;
  Point(Index: Graphic3d_ZLayerId): gp_Pnt2d;
  NbSegments(): Graphic3d_ZLayerId;
  Segment(Index: Graphic3d_ZLayerId, Curve1: Handle_Geom2d_Curve, Curve2: Handle_Geom2d_Curve): void;
  Intersector(): Geom2dInt_GInter;
  delete(): void;
}

  export declare class Geom2dAPI_InterCurveCurve_1 extends Geom2dAPI_InterCurveCurve {
    constructor();
  }

  export declare class Geom2dAPI_InterCurveCurve_2 extends Geom2dAPI_InterCurveCurve {
    constructor(C1: Handle_Geom2d_Curve, C2: Handle_Geom2d_Curve, Tol: Quantity_AbsorbedDose);
  }

  export declare class Geom2dAPI_InterCurveCurve_3 extends Geom2dAPI_InterCurveCurve {
    constructor(C1: Handle_Geom2d_Curve, Tol: Quantity_AbsorbedDose);
  }

export declare class TopTools_ListOfShape extends NCollection_BaseList {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Size(): Standard_Integer;
  Assign(theOther: TopTools_ListOfShape): TopTools_ListOfShape;
  Clear(theAllocator: Handle_NCollection_BaseAllocator): void;
  First_1(): TopoDS_Shape;
  First_2(): TopoDS_Shape;
  Last_1(): TopoDS_Shape;
  Last_2(): TopoDS_Shape;
  Append_1(theItem: TopoDS_Shape): TopoDS_Shape;
  Append_3(theOther: TopTools_ListOfShape): void;
  Prepend_1(theItem: TopoDS_Shape): TopoDS_Shape;
  Prepend_2(theOther: TopTools_ListOfShape): void;
  RemoveFirst(): void;
  Reverse(): void;
  delete(): void;
}

  export declare class TopTools_ListOfShape_1 extends TopTools_ListOfShape {
    constructor();
  }

  export declare class TopTools_ListOfShape_2 extends TopTools_ListOfShape {
    constructor(theAllocator: Handle_NCollection_BaseAllocator);
  }

  export declare class TopTools_ListOfShape_3 extends TopTools_ListOfShape {
    constructor(theOther: TopTools_ListOfShape);
  }

export declare class Adaptor3d_Surface {
  constructor();
  FirstUParameter(): Quantity_AbsorbedDose;
  LastUParameter(): Quantity_AbsorbedDose;
  FirstVParameter(): Quantity_AbsorbedDose;
  LastVParameter(): Quantity_AbsorbedDose;
  UContinuity(): GeomAbs_Shape;
  VContinuity(): GeomAbs_Shape;
  NbUIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  NbVIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  UIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  VIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  UTrim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HSurface;
  VTrim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HSurface;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Quantity_AbsorbedDose;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose): gp_Pnt;
  D0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  UResolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VResolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_SurfaceType;
  Plane(): gp_Pln;
  Cylinder(): gp_Cylinder;
  Cone(): gp_Cone;
  Sphere(): gp_Sphere;
  Torus(): gp_Torus;
  UDegree(): Graphic3d_ZLayerId;
  NbUPoles(): Graphic3d_ZLayerId;
  VDegree(): Graphic3d_ZLayerId;
  NbVPoles(): Graphic3d_ZLayerId;
  NbUKnots(): Graphic3d_ZLayerId;
  NbVKnots(): Graphic3d_ZLayerId;
  IsURational(): Standard_Boolean;
  IsVRational(): Standard_Boolean;
  Bezier(): Handle_Geom_BezierSurface;
  BSpline(): Handle_Geom_BSplineSurface;
  AxeOfRevolution(): gp_Ax1;
  Direction(): gp_Dir;
  BasisCurve(): Handle_Adaptor3d_HCurve;
  BasisSurface(): Handle_Adaptor3d_HSurface;
  OffsetValue(): Quantity_AbsorbedDose;
  delete(): void;
}

export declare class Adaptor3d_Curve {
  constructor();
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HCurve;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose): gp_Pnt;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  Resolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom_BezierCurve;
  BSpline(): Handle_Geom_BSplineCurve;
  OffsetCurve(): Handle_Geom_OffsetCurve;
  delete(): void;
}

export declare class BRepAdaptor_Curve extends Adaptor3d_Curve {
  Reset(): void;
  Initialize_1(E: TopoDS_Edge): void;
  Initialize_2(E: TopoDS_Edge, F: TopoDS_Face): void;
  Trsf(): gp_Trsf;
  Is3DCurve(): Standard_Boolean;
  IsCurveOnSurface(): Standard_Boolean;
  Curve(): GeomAdaptor_Curve;
  CurveOnSurface(): Adaptor3d_CurveOnSurface;
  Edge(): TopoDS_Edge;
  Tolerance(): Quantity_AbsorbedDose;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HCurve;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose): gp_Pnt;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  Resolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom_BezierCurve;
  BSpline(): Handle_Geom_BSplineCurve;
  OffsetCurve(): Handle_Geom_OffsetCurve;
  delete(): void;
}

  export declare class BRepAdaptor_Curve_1 extends BRepAdaptor_Curve {
    constructor();
  }

  export declare class BRepAdaptor_Curve_2 extends BRepAdaptor_Curve {
    constructor(E: TopoDS_Edge);
  }

  export declare class BRepAdaptor_Curve_3 extends BRepAdaptor_Curve {
    constructor(E: TopoDS_Edge, F: TopoDS_Face);
  }

export declare class BRepAdaptor_Surface extends Adaptor3d_Surface {
  Initialize(F: TopoDS_Face, Restriction: Standard_Boolean): void;
  Surface(): GeomAdaptor_Surface;
  ChangeSurface(): GeomAdaptor_Surface;
  Trsf(): gp_Trsf;
  Face(): TopoDS_Face;
  Tolerance(): Quantity_AbsorbedDose;
  FirstUParameter(): Quantity_AbsorbedDose;
  LastUParameter(): Quantity_AbsorbedDose;
  FirstVParameter(): Quantity_AbsorbedDose;
  LastVParameter(): Quantity_AbsorbedDose;
  UContinuity(): GeomAbs_Shape;
  VContinuity(): GeomAbs_Shape;
  NbUIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  NbVIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  UIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  VIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  UTrim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HSurface;
  VTrim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HSurface;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Quantity_AbsorbedDose;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose): gp_Pnt;
  D0(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, V: Quantity_AbsorbedDose, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  UResolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  VResolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_SurfaceType;
  Plane(): gp_Pln;
  Cylinder(): gp_Cylinder;
  Cone(): gp_Cone;
  Sphere(): gp_Sphere;
  Torus(): gp_Torus;
  UDegree(): Graphic3d_ZLayerId;
  NbUPoles(): Graphic3d_ZLayerId;
  VDegree(): Graphic3d_ZLayerId;
  NbVPoles(): Graphic3d_ZLayerId;
  NbUKnots(): Graphic3d_ZLayerId;
  NbVKnots(): Graphic3d_ZLayerId;
  IsURational(): Standard_Boolean;
  IsVRational(): Standard_Boolean;
  Bezier(): Handle_Geom_BezierSurface;
  BSpline(): Handle_Geom_BSplineSurface;
  AxeOfRevolution(): gp_Ax1;
  Direction(): gp_Dir;
  BasisCurve(): Handle_Adaptor3d_HCurve;
  BasisSurface(): Handle_Adaptor3d_HSurface;
  OffsetValue(): Quantity_AbsorbedDose;
  delete(): void;
}

  export declare class BRepAdaptor_Surface_1 extends BRepAdaptor_Surface {
    constructor();
  }

  export declare class BRepAdaptor_Surface_2 extends BRepAdaptor_Surface {
    constructor(F: TopoDS_Face, R: Standard_Boolean);
  }

export declare class BRepAdaptor_CompCurve extends Adaptor3d_Curve {
  Initialize_1(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean): void;
  Initialize_2(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): void;
  Wire(): TopoDS_Wire;
  Edge(U: Quantity_AbsorbedDose, E: TopoDS_Edge, UonE: Quantity_AbsorbedDose): void;
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor3d_HCurve;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose): gp_Pnt;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec;
  Resolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom_BezierCurve;
  BSpline(): Handle_Geom_BSplineCurve;
  delete(): void;
}

  export declare class BRepAdaptor_CompCurve_1 extends BRepAdaptor_CompCurve {
    constructor();
  }

  export declare class BRepAdaptor_CompCurve_2 extends BRepAdaptor_CompCurve {
    constructor(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean);
  }

  export declare class BRepAdaptor_CompCurve_3 extends BRepAdaptor_CompCurve {
    constructor(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean, First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose);
  }

export declare class Adaptor2d_Curve2d {
  constructor();
  FirstParameter(): Quantity_AbsorbedDose;
  LastParameter(): Quantity_AbsorbedDose;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Quantity_AbsorbedDose, Last: Quantity_AbsorbedDose, Tol: Quantity_AbsorbedDose): Handle_Adaptor2d_HCurve2d;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Quantity_AbsorbedDose;
  Value(U: Quantity_AbsorbedDose): gp_Pnt2d;
  D0(U: Quantity_AbsorbedDose, P: gp_Pnt2d): void;
  D1(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V: gp_Vec2d): void;
  D2(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Quantity_AbsorbedDose, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Quantity_AbsorbedDose, N: Graphic3d_ZLayerId): gp_Vec2d;
  Resolution(R3d: Quantity_AbsorbedDose): Quantity_AbsorbedDose;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin2d;
  Circle(): gp_Circ2d;
  Ellipse(): gp_Elips2d;
  Hyperbola(): gp_Hypr2d;
  Parabola(): gp_Parab2d;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  NbSamples(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom2d_BezierCurve;
  BSpline(): Handle_Geom2d_BSplineCurve;
  delete(): void;
}

export declare class Standard_Transient {
  Delete(): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  IsInstance_1(theType: Handle_Standard_Type): Standard_Boolean;
  IsInstance_2(theTypeName: Standard_CString): Standard_Boolean;
  IsKind_1(theType: Handle_Standard_Type): Standard_Boolean;
  IsKind_2(theTypeName: Standard_CString): Standard_Boolean;
  This(): MMgt_TShared;
  GetRefCount(): Graphic3d_ZLayerId;
  IncrementRefCounter(): void;
  DecrementRefCounter(): Graphic3d_ZLayerId;
  delete(): void;
}

  export declare class Standard_Transient_1 extends Standard_Transient {
    constructor();
  }

  export declare class Standard_Transient_2 extends Standard_Transient {
    constructor(a: MMgt_TShared);
  }

export declare type ChFi3d_FilletShape = {
  ChFi3d_Rational: {};
  ChFi3d_QuasiAngular: {};
  ChFi3d_Polynomial: {};
}

export declare type BRepFill_TypeOfContact = {
  BRepFill_NoContact: {};
  BRepFill_Contact: {};
  BRepFill_ContactOnBorder: {};
}

export declare class Message_ProgressRange {
  UserBreak(): Standard_Boolean;
  More(): Standard_Boolean;
  IsActive(): Standard_Boolean;
  Close(): void;
  delete(): void;
}

  export declare class Message_ProgressRange_1 extends Message_ProgressRange {
    constructor();
  }

  export declare class Message_ProgressRange_2 extends Message_ProgressRange {
    constructor(theOther: Message_ProgressRange);
  }

export declare class GProp_GProps {
  Add(Item: GProp_GProps, Density: Quantity_AbsorbedDose): void;
  Mass(): Quantity_AbsorbedDose;
  CentreOfMass(): gp_Pnt;
  MatrixOfInertia(): gp_Mat;
  StaticMoments(Ix: Quantity_AbsorbedDose, Iy: Quantity_AbsorbedDose, Iz: Quantity_AbsorbedDose): void;
  MomentOfInertia(A: gp_Ax1): Quantity_AbsorbedDose;
  PrincipalProperties(): GProp_PrincipalProps;
  RadiusOfGyration(A: gp_Ax1): Quantity_AbsorbedDose;
  delete(): void;
}

  export declare class GProp_GProps_1 extends GProp_GProps {
    constructor();
  }

  export declare class GProp_GProps_2 extends GProp_GProps {
    constructor(SystemLocation: gp_Pnt);
  }

export declare type Extrema_ExtAlgo = {
  Extrema_ExtAlgo_Grad: {};
  Extrema_ExtAlgo_Tree: {};
}

type Standard_Boolean = boolean;
type Standard_Byte = number;
type Standard_Character = number;
type Standard_CString = string;
type Standard_Integer = number;
type Standard_Real = number;
type Standard_ShortReal = number;
type Standard_Size = number;

declare namespace FS {
  interface Lookup {
      path: string;
      node: FSNode;
  }

  interface FSStream {}
  interface FSNode {}
  interface ErrnoError {}

  let ignorePermissions: boolean;
  let trackingDelegate: any;
  let tracking: any;
  let genericErrors: any;

  //
  // paths
  //
  function lookupPath(path: string, opts: any): Lookup;
  function getPath(node: FSNode): string;

  //
  // nodes
  //
  function isFile(mode: number): boolean;
  function isDir(mode: number): boolean;
  function isLink(mode: number): boolean;
  function isChrdev(mode: number): boolean;
  function isBlkdev(mode: number): boolean;
  function isFIFO(mode: number): boolean;
  function isSocket(mode: number): boolean;

  //
  // devices
  //
  function major(dev: number): number;
  function minor(dev: number): number;
  function makedev(ma: number, mi: number): number;
  function registerDevice(dev: number, ops: any): void;

  //
  // core
  //
  function syncfs(populate: boolean, callback: (e: any) => any): void;
  function syncfs(callback: (e: any) => any, populate?: boolean): void;
  function mount(type: any, opts: any, mountpoint: string): any;
  function unmount(mountpoint: string): void;

  function mkdir(path: string, mode?: number): any;
  function mkdev(path: string, mode?: number, dev?: number): any;
  function symlink(oldpath: string, newpath: string): any;
  function rename(old_path: string, new_path: string): void;
  function rmdir(path: string): void;
  function readdir(path: string): any;
  function unlink(path: string): void;
  function readlink(path: string): string;
  function stat(path: string, dontFollow?: boolean): any;
  function lstat(path: string): any;
  function chmod(path: string, mode: number, dontFollow?: boolean): void;
  function lchmod(path: string, mode: number): void;
  function fchmod(fd: number, mode: number): void;
  function chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
  function lchown(path: string, uid: number, gid: number): void;
  function fchown(fd: number, uid: number, gid: number): void;
  function truncate(path: string, len: number): void;
  function ftruncate(fd: number, len: number): void;
  function utime(path: string, atime: number, mtime: number): void;
  function open(path: string, flags: string, mode?: number, fd_start?: number, fd_end?: number): FSStream;
  function close(stream: FSStream): void;
  function llseek(stream: FSStream, offset: number, whence: number): any;
  function read(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number): number;
  function write(
      stream: FSStream,
      buffer: ArrayBufferView,
      offset: number,
      length: number,
      position?: number,
      canOwn?: boolean,
  ): number;
  function allocate(stream: FSStream, offset: number, length: number): void;
  function mmap(
      stream: FSStream,
      buffer: ArrayBufferView,
      offset: number,
      length: number,
      position: number,
      prot: number,
      flags: number,
  ): any;
  function ioctl(stream: FSStream, cmd: any, arg: any): any;
  function readFile(path: string, opts: { encoding: 'binary'; flags?: string }): Uint8Array;
  function readFile(path: string, opts: { encoding: 'utf8'; flags?: string }): string;
  function readFile(path: string, opts?: { flags?: string }): Uint8Array;
  function writeFile(path: string, data: string | ArrayBufferView, opts?: { flags?: string }): void;

  //
  // module-level FS code
  //
  function cwd(): string;
  function chdir(path: string): void;
  function init(
      input: null | (() => number | null),
      output: null | ((c: number) => any),
      error: null | ((c: number) => any),
  ): void;

  function createLazyFile(
      parent: string | FSNode,
      name: string,
      url: string,
      canRead: boolean,
      canWrite: boolean,
  ): FSNode;
  function createPreloadedFile(
      parent: string | FSNode,
      name: string,
      url: string,
      canRead: boolean,
      canWrite: boolean,
      onload?: () => void,
      onerror?: () => void,
      dontCreateFile?: boolean,
      canOwn?: boolean,
  ): void;
  function createDataFile(
      parent: string | FSNode,
      name: string,
      data: ArrayBufferView | string,
      canRead: boolean,
      canWrite: boolean,
      canOwn: boolean,
  ): FSNode;
  interface AnalysisResults {
    isRoot: boolean,
    exists: boolean,
    error: Error,
    name: string,
    path: any,
    object: any,
    parentExists: boolean,
    parentPath: any,
    parentObject: any
  }
  function analyzePath(path: string): AnalysisResults;
}


export type OpenCascadeInstance = {FS: typeof FS} & {
  Precision: typeof Precision;
  Geom2dConvert_BSplineCurveToBezierCurve: typeof Geom2dConvert_BSplineCurveToBezierCurve;
  Geom2dConvert_BSplineCurveToBezierCurve_1: typeof Geom2dConvert_BSplineCurveToBezierCurve_1;
  Geom2dConvert_BSplineCurveToBezierCurve_2: typeof Geom2dConvert_BSplineCurveToBezierCurve_2;
  Geom2dConvert: typeof Geom2dConvert;
  Poly_Triangle: typeof Poly_Triangle;
  Poly_Triangle_1: typeof Poly_Triangle_1;
  Poly_Triangle_2: typeof Poly_Triangle_2;
  Poly_Array1OfTriangle: typeof Poly_Array1OfTriangle;
  Poly_Array1OfTriangle_1: typeof Poly_Array1OfTriangle_1;
  Poly_Array1OfTriangle_2: typeof Poly_Array1OfTriangle_2;
  Poly_Array1OfTriangle_3: typeof Poly_Array1OfTriangle_3;
  Poly_Array1OfTriangle_4: typeof Poly_Array1OfTriangle_4;
  Poly_Array1OfTriangle_5: typeof Poly_Array1OfTriangle_5;
  Poly_Connect: typeof Poly_Connect;
  Poly_Connect_1: typeof Poly_Connect_1;
  Poly_Connect_2: typeof Poly_Connect_2;
  Handle_Poly_Triangulation: typeof Handle_Poly_Triangulation;
  Handle_Poly_Triangulation_1: typeof Handle_Poly_Triangulation_1;
  Handle_Poly_Triangulation_2: typeof Handle_Poly_Triangulation_2;
  Handle_Poly_Triangulation_3: typeof Handle_Poly_Triangulation_3;
  Handle_Poly_Triangulation_4: typeof Handle_Poly_Triangulation_4;
  Poly_Triangulation: typeof Poly_Triangulation;
  Poly_Triangulation_1: typeof Poly_Triangulation_1;
  Poly_Triangulation_2: typeof Poly_Triangulation_2;
  Poly_Triangulation_3: typeof Poly_Triangulation_3;
  Poly_Triangulation_4: typeof Poly_Triangulation_4;
  Poly_PolygonOnTriangulation: typeof Poly_PolygonOnTriangulation;
  Poly_PolygonOnTriangulation_1: typeof Poly_PolygonOnTriangulation_1;
  Poly_PolygonOnTriangulation_2: typeof Poly_PolygonOnTriangulation_2;
  Poly_PolygonOnTriangulation_3: typeof Poly_PolygonOnTriangulation_3;
  Handle_Poly_PolygonOnTriangulation: typeof Handle_Poly_PolygonOnTriangulation;
  Handle_Poly_PolygonOnTriangulation_1: typeof Handle_Poly_PolygonOnTriangulation_1;
  Handle_Poly_PolygonOnTriangulation_2: typeof Handle_Poly_PolygonOnTriangulation_2;
  Handle_Poly_PolygonOnTriangulation_3: typeof Handle_Poly_PolygonOnTriangulation_3;
  Handle_Poly_PolygonOnTriangulation_4: typeof Handle_Poly_PolygonOnTriangulation_4;
  BRepOffset_Mode: BRepOffset_Mode;
  NCollection_BaseList: typeof NCollection_BaseList;
  BRepMesh_IncrementalMesh: typeof BRepMesh_IncrementalMesh;
  BRepMesh_IncrementalMesh_1: typeof BRepMesh_IncrementalMesh_1;
  BRepMesh_IncrementalMesh_2: typeof BRepMesh_IncrementalMesh_2;
  BRepMesh_IncrementalMesh_3: typeof BRepMesh_IncrementalMesh_3;
  BRepMesh_DiscretRoot: typeof BRepMesh_DiscretRoot;
  BRepAlgoAPI_Section: typeof BRepAlgoAPI_Section;
  BRepAlgoAPI_Section_1: typeof BRepAlgoAPI_Section_1;
  BRepAlgoAPI_Section_2: typeof BRepAlgoAPI_Section_2;
  BRepAlgoAPI_Section_3: typeof BRepAlgoAPI_Section_3;
  BRepAlgoAPI_Section_4: typeof BRepAlgoAPI_Section_4;
  BRepAlgoAPI_Section_5: typeof BRepAlgoAPI_Section_5;
  BRepAlgoAPI_Section_6: typeof BRepAlgoAPI_Section_6;
  BRepAlgoAPI_Section_7: typeof BRepAlgoAPI_Section_7;
  BRepAlgoAPI_Section_8: typeof BRepAlgoAPI_Section_8;
  BRepAlgoAPI_BooleanOperation: typeof BRepAlgoAPI_BooleanOperation;
  BRepAlgoAPI_BooleanOperation_1: typeof BRepAlgoAPI_BooleanOperation_1;
  BRepAlgoAPI_BooleanOperation_2: typeof BRepAlgoAPI_BooleanOperation_2;
  BRepAlgoAPI_Cut: typeof BRepAlgoAPI_Cut;
  BRepAlgoAPI_Cut_1: typeof BRepAlgoAPI_Cut_1;
  BRepAlgoAPI_Cut_2: typeof BRepAlgoAPI_Cut_2;
  BRepAlgoAPI_Cut_3: typeof BRepAlgoAPI_Cut_3;
  BRepAlgoAPI_Cut_4: typeof BRepAlgoAPI_Cut_4;
  BRepAlgoAPI_Algo: typeof BRepAlgoAPI_Algo;
  BRepAlgoAPI_BuilderAlgo: typeof BRepAlgoAPI_BuilderAlgo;
  BRepAlgoAPI_BuilderAlgo_1: typeof BRepAlgoAPI_BuilderAlgo_1;
  BRepAlgoAPI_BuilderAlgo_2: typeof BRepAlgoAPI_BuilderAlgo_2;
  BRepAlgoAPI_Fuse: typeof BRepAlgoAPI_Fuse;
  BRepAlgoAPI_Fuse_1: typeof BRepAlgoAPI_Fuse_1;
  BRepAlgoAPI_Fuse_2: typeof BRepAlgoAPI_Fuse_2;
  BRepAlgoAPI_Fuse_3: typeof BRepAlgoAPI_Fuse_3;
  BRepAlgoAPI_Fuse_4: typeof BRepAlgoAPI_Fuse_4;
  BRepAlgoAPI_Common: typeof BRepAlgoAPI_Common;
  BRepAlgoAPI_Common_1: typeof BRepAlgoAPI_Common_1;
  BRepAlgoAPI_Common_2: typeof BRepAlgoAPI_Common_2;
  BRepAlgoAPI_Common_3: typeof BRepAlgoAPI_Common_3;
  BRepAlgoAPI_Common_4: typeof BRepAlgoAPI_Common_4;
  Geom2d_Conic: typeof Geom2d_Conic;
  Handle_Geom2d_BezierCurve: typeof Handle_Geom2d_BezierCurve;
  Handle_Geom2d_BezierCurve_1: typeof Handle_Geom2d_BezierCurve_1;
  Handle_Geom2d_BezierCurve_2: typeof Handle_Geom2d_BezierCurve_2;
  Handle_Geom2d_BezierCurve_3: typeof Handle_Geom2d_BezierCurve_3;
  Handle_Geom2d_BezierCurve_4: typeof Handle_Geom2d_BezierCurve_4;
  Geom2d_BezierCurve: typeof Geom2d_BezierCurve;
  Geom2d_BezierCurve_1: typeof Geom2d_BezierCurve_1;
  Geom2d_BezierCurve_2: typeof Geom2d_BezierCurve_2;
  Handle_Geom2d_BoundedCurve: typeof Handle_Geom2d_BoundedCurve;
  Handle_Geom2d_BoundedCurve_1: typeof Handle_Geom2d_BoundedCurve_1;
  Handle_Geom2d_BoundedCurve_2: typeof Handle_Geom2d_BoundedCurve_2;
  Handle_Geom2d_BoundedCurve_3: typeof Handle_Geom2d_BoundedCurve_3;
  Handle_Geom2d_BoundedCurve_4: typeof Handle_Geom2d_BoundedCurve_4;
  Geom2d_BoundedCurve: typeof Geom2d_BoundedCurve;
  Handle_Geom2d_Geometry: typeof Handle_Geom2d_Geometry;
  Handle_Geom2d_Geometry_1: typeof Handle_Geom2d_Geometry_1;
  Handle_Geom2d_Geometry_2: typeof Handle_Geom2d_Geometry_2;
  Handle_Geom2d_Geometry_3: typeof Handle_Geom2d_Geometry_3;
  Handle_Geom2d_Geometry_4: typeof Handle_Geom2d_Geometry_4;
  Geom2d_Geometry: typeof Geom2d_Geometry;
  Handle_Geom2d_Circle: typeof Handle_Geom2d_Circle;
  Handle_Geom2d_Circle_1: typeof Handle_Geom2d_Circle_1;
  Handle_Geom2d_Circle_2: typeof Handle_Geom2d_Circle_2;
  Handle_Geom2d_Circle_3: typeof Handle_Geom2d_Circle_3;
  Handle_Geom2d_Circle_4: typeof Handle_Geom2d_Circle_4;
  Geom2d_Circle: typeof Geom2d_Circle;
  Geom2d_Circle_1: typeof Geom2d_Circle_1;
  Geom2d_Circle_2: typeof Geom2d_Circle_2;
  Geom2d_Circle_3: typeof Geom2d_Circle_3;
  Handle_Geom2d_TrimmedCurve: typeof Handle_Geom2d_TrimmedCurve;
  Handle_Geom2d_TrimmedCurve_1: typeof Handle_Geom2d_TrimmedCurve_1;
  Handle_Geom2d_TrimmedCurve_2: typeof Handle_Geom2d_TrimmedCurve_2;
  Handle_Geom2d_TrimmedCurve_3: typeof Handle_Geom2d_TrimmedCurve_3;
  Handle_Geom2d_TrimmedCurve_4: typeof Handle_Geom2d_TrimmedCurve_4;
  Geom2d_TrimmedCurve: typeof Geom2d_TrimmedCurve;
  Handle_Geom2d_Curve: typeof Handle_Geom2d_Curve;
  Handle_Geom2d_Curve_1: typeof Handle_Geom2d_Curve_1;
  Handle_Geom2d_Curve_2: typeof Handle_Geom2d_Curve_2;
  Handle_Geom2d_Curve_3: typeof Handle_Geom2d_Curve_3;
  Handle_Geom2d_Curve_4: typeof Handle_Geom2d_Curve_4;
  Geom2d_Curve: typeof Geom2d_Curve;
  Geom2d_Line: typeof Geom2d_Line;
  Geom2d_Line_1: typeof Geom2d_Line_1;
  Geom2d_Line_2: typeof Geom2d_Line_2;
  Geom2d_Line_3: typeof Geom2d_Line_3;
  Handle_Geom2d_Line: typeof Handle_Geom2d_Line;
  Handle_Geom2d_Line_1: typeof Handle_Geom2d_Line_1;
  Handle_Geom2d_Line_2: typeof Handle_Geom2d_Line_2;
  Handle_Geom2d_Line_3: typeof Handle_Geom2d_Line_3;
  Handle_Geom2d_Line_4: typeof Handle_Geom2d_Line_4;
  Geom2d_Ellipse: typeof Geom2d_Ellipse;
  Geom2d_Ellipse_1: typeof Geom2d_Ellipse_1;
  Geom2d_Ellipse_2: typeof Geom2d_Ellipse_2;
  Geom2d_Ellipse_3: typeof Geom2d_Ellipse_3;
  Handle_Geom2d_Ellipse: typeof Handle_Geom2d_Ellipse;
  Handle_Geom2d_Ellipse_1: typeof Handle_Geom2d_Ellipse_1;
  Handle_Geom2d_Ellipse_2: typeof Handle_Geom2d_Ellipse_2;
  Handle_Geom2d_Ellipse_3: typeof Handle_Geom2d_Ellipse_3;
  Handle_Geom2d_Ellipse_4: typeof Handle_Geom2d_Ellipse_4;
  Handle_Geom2d_BSplineCurve: typeof Handle_Geom2d_BSplineCurve;
  Handle_Geom2d_BSplineCurve_1: typeof Handle_Geom2d_BSplineCurve_1;
  Handle_Geom2d_BSplineCurve_2: typeof Handle_Geom2d_BSplineCurve_2;
  Handle_Geom2d_BSplineCurve_3: typeof Handle_Geom2d_BSplineCurve_3;
  Handle_Geom2d_BSplineCurve_4: typeof Handle_Geom2d_BSplineCurve_4;
  Geom2d_BSplineCurve: typeof Geom2d_BSplineCurve;
  Geom2d_BSplineCurve_1: typeof Geom2d_BSplineCurve_1;
  Geom2d_BSplineCurve_2: typeof Geom2d_BSplineCurve_2;
  TopAbs_Orientation: TopAbs_Orientation;
  TopAbs_ShapeEnum: TopAbs_ShapeEnum;
  GC_MakeArcOfCircle: typeof GC_MakeArcOfCircle;
  GC_MakeArcOfCircle_1: typeof GC_MakeArcOfCircle_1;
  GC_MakeArcOfCircle_2: typeof GC_MakeArcOfCircle_2;
  GC_MakeArcOfCircle_3: typeof GC_MakeArcOfCircle_3;
  GC_MakeArcOfCircle_4: typeof GC_MakeArcOfCircle_4;
  GC_MakeArcOfCircle_5: typeof GC_MakeArcOfCircle_5;
  GC_MakeArcOfEllipse: typeof GC_MakeArcOfEllipse;
  GC_MakeArcOfEllipse_1: typeof GC_MakeArcOfEllipse_1;
  GC_MakeArcOfEllipse_2: typeof GC_MakeArcOfEllipse_2;
  GC_MakeArcOfEllipse_3: typeof GC_MakeArcOfEllipse_3;
  GC_Root: typeof GC_Root;
  BRepOffsetAPI_MakeOffsetShape: typeof BRepOffsetAPI_MakeOffsetShape;
  BRepOffsetAPI_MakeOffsetShape_1: typeof BRepOffsetAPI_MakeOffsetShape_1;
  BRepOffsetAPI_MakeOffsetShape_2: typeof BRepOffsetAPI_MakeOffsetShape_2;
  BRepOffsetAPI_MakeFilling: typeof BRepOffsetAPI_MakeFilling;
  BRepOffsetAPI_MakePipeShell: typeof BRepOffsetAPI_MakePipeShell;
  BRepOffsetAPI_ThruSections: typeof BRepOffsetAPI_ThruSections;
  BRepOffsetAPI_MakeThickSolid: typeof BRepOffsetAPI_MakeThickSolid;
  BRepOffsetAPI_MakeThickSolid_1: typeof BRepOffsetAPI_MakeThickSolid_1;
  BRepOffsetAPI_MakeThickSolid_2: typeof BRepOffsetAPI_MakeThickSolid_2;
  BRepOffsetAPI_MakeOffset: typeof BRepOffsetAPI_MakeOffset;
  BRepOffsetAPI_MakeOffset_1: typeof BRepOffsetAPI_MakeOffset_1;
  BRepOffsetAPI_MakeOffset_2: typeof BRepOffsetAPI_MakeOffset_2;
  BRepOffsetAPI_MakeOffset_3: typeof BRepOffsetAPI_MakeOffset_3;
  BRepOffsetAPI_MakePipe: typeof BRepOffsetAPI_MakePipe;
  BRepOffsetAPI_MakePipe_1: typeof BRepOffsetAPI_MakePipe_1;
  BRepOffsetAPI_MakePipe_2: typeof BRepOffsetAPI_MakePipe_2;
  GeomAPI_Interpolate: typeof GeomAPI_Interpolate;
  GeomAPI_Interpolate_1: typeof GeomAPI_Interpolate_1;
  GeomAPI_Interpolate_2: typeof GeomAPI_Interpolate_2;
  GeomAPI_ProjectPointOnSurf: typeof GeomAPI_ProjectPointOnSurf;
  GeomAPI_ProjectPointOnSurf_1: typeof GeomAPI_ProjectPointOnSurf_1;
  GeomAPI_ProjectPointOnSurf_2: typeof GeomAPI_ProjectPointOnSurf_2;
  GeomAPI_ProjectPointOnSurf_3: typeof GeomAPI_ProjectPointOnSurf_3;
  GeomAPI_ProjectPointOnSurf_4: typeof GeomAPI_ProjectPointOnSurf_4;
  GeomAPI_ProjectPointOnSurf_5: typeof GeomAPI_ProjectPointOnSurf_5;
  GeomAPI_PointsToBSplineSurface: typeof GeomAPI_PointsToBSplineSurface;
  GeomAPI_PointsToBSplineSurface_1: typeof GeomAPI_PointsToBSplineSurface_1;
  GeomAPI_PointsToBSplineSurface_2: typeof GeomAPI_PointsToBSplineSurface_2;
  GeomAPI_PointsToBSplineSurface_3: typeof GeomAPI_PointsToBSplineSurface_3;
  GeomAPI_PointsToBSplineSurface_4: typeof GeomAPI_PointsToBSplineSurface_4;
  GeomAPI_PointsToBSplineSurface_5: typeof GeomAPI_PointsToBSplineSurface_5;
  GeomAPI_PointsToBSpline: typeof GeomAPI_PointsToBSpline;
  GeomAPI_PointsToBSpline_1: typeof GeomAPI_PointsToBSpline_1;
  GeomAPI_PointsToBSpline_2: typeof GeomAPI_PointsToBSpline_2;
  GeomAPI_PointsToBSpline_3: typeof GeomAPI_PointsToBSpline_3;
  GeomAPI_PointsToBSpline_4: typeof GeomAPI_PointsToBSpline_4;
  GeomAPI_PointsToBSpline_5: typeof GeomAPI_PointsToBSpline_5;
  BRepCheck_Analyzer: typeof BRepCheck_Analyzer;
  ShapeFix_Face: typeof ShapeFix_Face;
  ShapeFix_Face_1: typeof ShapeFix_Face_1;
  ShapeFix_Face_2: typeof ShapeFix_Face_2;
  ShapeFix_Solid: typeof ShapeFix_Solid;
  ShapeFix_Solid_1: typeof ShapeFix_Solid_1;
  ShapeFix_Solid_2: typeof ShapeFix_Solid_2;
  ShapeFix_Root: typeof ShapeFix_Root;
  ShapeFix_Wire: typeof ShapeFix_Wire;
  ShapeFix_Wire_1: typeof ShapeFix_Wire_1;
  ShapeFix_Wire_2: typeof ShapeFix_Wire_2;
  ShapeFix_EdgeConnect: typeof ShapeFix_EdgeConnect;
  GeomAbs_Shape: GeomAbs_Shape;
  GeomAbs_SurfaceType: GeomAbs_SurfaceType;
  GeomAbs_CurveType: GeomAbs_CurveType;
  GeomAbs_JoinType: GeomAbs_JoinType;
  Convert_ParameterisationType: Convert_ParameterisationType;
  GCPnts_TangentialDeflection: typeof GCPnts_TangentialDeflection;
  GCPnts_TangentialDeflection_1: typeof GCPnts_TangentialDeflection_1;
  GCPnts_TangentialDeflection_2: typeof GCPnts_TangentialDeflection_2;
  GCPnts_TangentialDeflection_3: typeof GCPnts_TangentialDeflection_3;
  GCPnts_TangentialDeflection_4: typeof GCPnts_TangentialDeflection_4;
  GCPnts_TangentialDeflection_5: typeof GCPnts_TangentialDeflection_5;
  BRepBndLib: typeof BRepBndLib;
  BndLib_Add2dCurve: typeof BndLib_Add2dCurve;
  GCE2d_MakeArcOfCircle: typeof GCE2d_MakeArcOfCircle;
  GCE2d_MakeArcOfCircle_1: typeof GCE2d_MakeArcOfCircle_1;
  GCE2d_MakeArcOfCircle_2: typeof GCE2d_MakeArcOfCircle_2;
  GCE2d_MakeArcOfCircle_3: typeof GCE2d_MakeArcOfCircle_3;
  GCE2d_MakeArcOfCircle_4: typeof GCE2d_MakeArcOfCircle_4;
  GCE2d_MakeArcOfCircle_5: typeof GCE2d_MakeArcOfCircle_5;
  GCE2d_MakeSegment: typeof GCE2d_MakeSegment;
  GCE2d_MakeSegment_1: typeof GCE2d_MakeSegment_1;
  GCE2d_MakeSegment_2: typeof GCE2d_MakeSegment_2;
  GCE2d_MakeSegment_3: typeof GCE2d_MakeSegment_3;
  GCE2d_MakeSegment_4: typeof GCE2d_MakeSegment_4;
  GCE2d_MakeSegment_5: typeof GCE2d_MakeSegment_5;
  GCE2d_MakeEllipse: typeof GCE2d_MakeEllipse;
  GCE2d_MakeEllipse_1: typeof GCE2d_MakeEllipse_1;
  GCE2d_MakeEllipse_2: typeof GCE2d_MakeEllipse_2;
  GCE2d_MakeEllipse_3: typeof GCE2d_MakeEllipse_3;
  GCE2d_MakeEllipse_4: typeof GCE2d_MakeEllipse_4;
  GCE2d_MakeArcOfEllipse: typeof GCE2d_MakeArcOfEllipse;
  GCE2d_MakeArcOfEllipse_1: typeof GCE2d_MakeArcOfEllipse_1;
  GCE2d_MakeArcOfEllipse_2: typeof GCE2d_MakeArcOfEllipse_2;
  GCE2d_MakeArcOfEllipse_3: typeof GCE2d_MakeArcOfEllipse_3;
  GCE2d_Root: typeof GCE2d_Root;
  GCE2d_MakeCircle: typeof GCE2d_MakeCircle;
  GCE2d_MakeCircle_1: typeof GCE2d_MakeCircle_1;
  GCE2d_MakeCircle_2: typeof GCE2d_MakeCircle_2;
  GCE2d_MakeCircle_3: typeof GCE2d_MakeCircle_3;
  GCE2d_MakeCircle_4: typeof GCE2d_MakeCircle_4;
  GCE2d_MakeCircle_5: typeof GCE2d_MakeCircle_5;
  GCE2d_MakeCircle_6: typeof GCE2d_MakeCircle_6;
  GCE2d_MakeCircle_7: typeof GCE2d_MakeCircle_7;
  GCE2d_MakeCircle_8: typeof GCE2d_MakeCircle_8;
  GeomLib: typeof GeomLib;
  BRepExtrema_DistShapeShape: typeof BRepExtrema_DistShapeShape;
  BRepExtrema_DistShapeShape_1: typeof BRepExtrema_DistShapeShape_1;
  BRepExtrema_DistShapeShape_2: typeof BRepExtrema_DistShapeShape_2;
  BRepExtrema_DistShapeShape_3: typeof BRepExtrema_DistShapeShape_3;
  Geom2dAdaptor_Curve: typeof Geom2dAdaptor_Curve;
  Geom2dAdaptor_Curve_1: typeof Geom2dAdaptor_Curve_1;
  Geom2dAdaptor_Curve_2: typeof Geom2dAdaptor_Curve_2;
  Geom2dAdaptor_Curve_3: typeof Geom2dAdaptor_Curve_3;
  ChFiDS_ChamfMode: ChFiDS_ChamfMode;
  Law_S: typeof Law_S;
  Law_Interpol: typeof Law_Interpol;
  Law_Composite: typeof Law_Composite;
  Law_Composite_1: typeof Law_Composite_1;
  Law_Composite_2: typeof Law_Composite_2;
  Law_Function: typeof Law_Function;
  Handle_Law_Function: typeof Handle_Law_Function;
  Handle_Law_Function_1: typeof Handle_Law_Function_1;
  Handle_Law_Function_2: typeof Handle_Law_Function_2;
  Handle_Law_Function_3: typeof Handle_Law_Function_3;
  Handle_Law_Function_4: typeof Handle_Law_Function_4;
  Law_Linear: typeof Law_Linear;
  Law_BSpFunc: typeof Law_BSpFunc;
  Law_BSpFunc_1: typeof Law_BSpFunc_1;
  Law_BSpFunc_2: typeof Law_BSpFunc_2;
  BRep_Tool: typeof BRep_Tool;
  StdPrs_ToolTriangulatedShape: typeof StdPrs_ToolTriangulatedShape;
  BOPAlgo_GlueEnum: BOPAlgo_GlueEnum;
  BOPAlgo_Options: typeof BOPAlgo_Options;
  BOPAlgo_Options_1: typeof BOPAlgo_Options_1;
  BOPAlgo_Options_2: typeof BOPAlgo_Options_2;
  StlAPI: typeof StlAPI;
  StlAPI_Writer: typeof StlAPI_Writer;
  StlAPI_Reader: typeof StlAPI_Reader;
  BRepGProp_Face: typeof BRepGProp_Face;
  BRepGProp_Face_1: typeof BRepGProp_Face_1;
  BRepGProp_Face_2: typeof BRepGProp_Face_2;
  BRepGProp: typeof BRepGProp;
  IFSelect_ReturnStatus: IFSelect_ReturnStatus;
  XSControl_Reader: typeof XSControl_Reader;
  XSControl_Reader_1: typeof XSControl_Reader_1;
  XSControl_Reader_2: typeof XSControl_Reader_2;
  XSControl_Reader_3: typeof XSControl_Reader_3;
  BRepFeat_Form: typeof BRepFeat_Form;
  BRepFeat_MakeDPrism: typeof BRepFeat_MakeDPrism;
  BRepFeat_MakeDPrism_1: typeof BRepFeat_MakeDPrism_1;
  BRepFeat_MakeDPrism_2: typeof BRepFeat_MakeDPrism_2;
  TopoDS_Edge: typeof TopoDS_Edge;
  TopoDS_Shell: typeof TopoDS_Shell;
  TopoDS_Builder: typeof TopoDS_Builder;
  TopoDS: typeof TopoDS;
  TopoDS_Solid: typeof TopoDS_Solid;
  TopoDS_Vertex: typeof TopoDS_Vertex;
  TopoDS_Wire: typeof TopoDS_Wire;
  TopoDS_Compound: typeof TopoDS_Compound;
  TopoDS_Shape: typeof TopoDS_Shape;
  TopoDS_CompSolid: typeof TopoDS_CompSolid;
  TopoDS_Face: typeof TopoDS_Face;
  ShapeUpgrade_UnifySameDomain: typeof ShapeUpgrade_UnifySameDomain;
  ShapeUpgrade_UnifySameDomain_1: typeof ShapeUpgrade_UnifySameDomain_1;
  ShapeUpgrade_UnifySameDomain_2: typeof ShapeUpgrade_UnifySameDomain_2;
  TColgp_Array2OfPnt: typeof TColgp_Array2OfPnt;
  TColgp_Array2OfPnt_1: typeof TColgp_Array2OfPnt_1;
  TColgp_Array2OfPnt_2: typeof TColgp_Array2OfPnt_2;
  TColgp_Array2OfPnt_3: typeof TColgp_Array2OfPnt_3;
  TColgp_Array2OfPnt_4: typeof TColgp_Array2OfPnt_4;
  TColgp_Array2OfPnt_5: typeof TColgp_Array2OfPnt_5;
  TColgp_Array1OfPnt: typeof TColgp_Array1OfPnt;
  TColgp_Array1OfPnt_1: typeof TColgp_Array1OfPnt_1;
  TColgp_Array1OfPnt_2: typeof TColgp_Array1OfPnt_2;
  TColgp_Array1OfPnt_3: typeof TColgp_Array1OfPnt_3;
  TColgp_Array1OfPnt_4: typeof TColgp_Array1OfPnt_4;
  TColgp_Array1OfPnt_5: typeof TColgp_Array1OfPnt_5;
  TColgp_Array1OfVec: typeof TColgp_Array1OfVec;
  TColgp_Array1OfVec_1: typeof TColgp_Array1OfVec_1;
  TColgp_Array1OfVec_2: typeof TColgp_Array1OfVec_2;
  TColgp_Array1OfVec_3: typeof TColgp_Array1OfVec_3;
  TColgp_Array1OfVec_4: typeof TColgp_Array1OfVec_4;
  TColgp_Array1OfVec_5: typeof TColgp_Array1OfVec_5;
  TColgp_Array1OfDir: typeof TColgp_Array1OfDir;
  TColgp_Array1OfDir_1: typeof TColgp_Array1OfDir_1;
  TColgp_Array1OfDir_2: typeof TColgp_Array1OfDir_2;
  TColgp_Array1OfDir_3: typeof TColgp_Array1OfDir_3;
  TColgp_Array1OfDir_4: typeof TColgp_Array1OfDir_4;
  TColgp_Array1OfDir_5: typeof TColgp_Array1OfDir_5;
  TColgp_Array1OfPnt2d: typeof TColgp_Array1OfPnt2d;
  TColgp_Array1OfPnt2d_1: typeof TColgp_Array1OfPnt2d_1;
  TColgp_Array1OfPnt2d_2: typeof TColgp_Array1OfPnt2d_2;
  TColgp_Array1OfPnt2d_3: typeof TColgp_Array1OfPnt2d_3;
  TColgp_Array1OfPnt2d_4: typeof TColgp_Array1OfPnt2d_4;
  TColgp_Array1OfPnt2d_5: typeof TColgp_Array1OfPnt2d_5;
  BRepTools: typeof BRepTools;
  BRepBuilderAPI_Sewing: typeof BRepBuilderAPI_Sewing;
  BRepBuilderAPI_ModifyShape: typeof BRepBuilderAPI_ModifyShape;
  BRepBuilderAPI_MakeVertex: typeof BRepBuilderAPI_MakeVertex;
  BRepBuilderAPI_WireError: BRepBuilderAPI_WireError;
  BRepBuilderAPI_MakeWire: typeof BRepBuilderAPI_MakeWire;
  BRepBuilderAPI_MakeWire_1: typeof BRepBuilderAPI_MakeWire_1;
  BRepBuilderAPI_MakeWire_2: typeof BRepBuilderAPI_MakeWire_2;
  BRepBuilderAPI_MakeWire_3: typeof BRepBuilderAPI_MakeWire_3;
  BRepBuilderAPI_MakeWire_4: typeof BRepBuilderAPI_MakeWire_4;
  BRepBuilderAPI_MakeWire_5: typeof BRepBuilderAPI_MakeWire_5;
  BRepBuilderAPI_MakeWire_6: typeof BRepBuilderAPI_MakeWire_6;
  BRepBuilderAPI_MakeWire_7: typeof BRepBuilderAPI_MakeWire_7;
  BRepBuilderAPI_MakeShape: typeof BRepBuilderAPI_MakeShape;
  BRepBuilderAPI_MakeSolid: typeof BRepBuilderAPI_MakeSolid;
  BRepBuilderAPI_MakeSolid_1: typeof BRepBuilderAPI_MakeSolid_1;
  BRepBuilderAPI_MakeSolid_2: typeof BRepBuilderAPI_MakeSolid_2;
  BRepBuilderAPI_MakeSolid_3: typeof BRepBuilderAPI_MakeSolid_3;
  BRepBuilderAPI_MakeSolid_4: typeof BRepBuilderAPI_MakeSolid_4;
  BRepBuilderAPI_MakeSolid_5: typeof BRepBuilderAPI_MakeSolid_5;
  BRepBuilderAPI_MakeSolid_6: typeof BRepBuilderAPI_MakeSolid_6;
  BRepBuilderAPI_MakeSolid_7: typeof BRepBuilderAPI_MakeSolid_7;
  BRepBuilderAPI_MakeEdge: typeof BRepBuilderAPI_MakeEdge;
  BRepBuilderAPI_MakeEdge_1: typeof BRepBuilderAPI_MakeEdge_1;
  BRepBuilderAPI_MakeEdge_2: typeof BRepBuilderAPI_MakeEdge_2;
  BRepBuilderAPI_MakeEdge_3: typeof BRepBuilderAPI_MakeEdge_3;
  BRepBuilderAPI_MakeEdge_4: typeof BRepBuilderAPI_MakeEdge_4;
  BRepBuilderAPI_MakeEdge_5: typeof BRepBuilderAPI_MakeEdge_5;
  BRepBuilderAPI_MakeEdge_6: typeof BRepBuilderAPI_MakeEdge_6;
  BRepBuilderAPI_MakeEdge_7: typeof BRepBuilderAPI_MakeEdge_7;
  BRepBuilderAPI_MakeEdge_8: typeof BRepBuilderAPI_MakeEdge_8;
  BRepBuilderAPI_MakeEdge_9: typeof BRepBuilderAPI_MakeEdge_9;
  BRepBuilderAPI_MakeEdge_10: typeof BRepBuilderAPI_MakeEdge_10;
  BRepBuilderAPI_MakeEdge_11: typeof BRepBuilderAPI_MakeEdge_11;
  BRepBuilderAPI_MakeEdge_12: typeof BRepBuilderAPI_MakeEdge_12;
  BRepBuilderAPI_MakeEdge_13: typeof BRepBuilderAPI_MakeEdge_13;
  BRepBuilderAPI_MakeEdge_14: typeof BRepBuilderAPI_MakeEdge_14;
  BRepBuilderAPI_MakeEdge_15: typeof BRepBuilderAPI_MakeEdge_15;
  BRepBuilderAPI_MakeEdge_16: typeof BRepBuilderAPI_MakeEdge_16;
  BRepBuilderAPI_MakeEdge_17: typeof BRepBuilderAPI_MakeEdge_17;
  BRepBuilderAPI_MakeEdge_18: typeof BRepBuilderAPI_MakeEdge_18;
  BRepBuilderAPI_MakeEdge_19: typeof BRepBuilderAPI_MakeEdge_19;
  BRepBuilderAPI_MakeEdge_20: typeof BRepBuilderAPI_MakeEdge_20;
  BRepBuilderAPI_MakeEdge_21: typeof BRepBuilderAPI_MakeEdge_21;
  BRepBuilderAPI_MakeEdge_22: typeof BRepBuilderAPI_MakeEdge_22;
  BRepBuilderAPI_MakeEdge_23: typeof BRepBuilderAPI_MakeEdge_23;
  BRepBuilderAPI_MakeEdge_24: typeof BRepBuilderAPI_MakeEdge_24;
  BRepBuilderAPI_MakeEdge_25: typeof BRepBuilderAPI_MakeEdge_25;
  BRepBuilderAPI_MakeEdge_26: typeof BRepBuilderAPI_MakeEdge_26;
  BRepBuilderAPI_MakeEdge_27: typeof BRepBuilderAPI_MakeEdge_27;
  BRepBuilderAPI_MakeEdge_28: typeof BRepBuilderAPI_MakeEdge_28;
  BRepBuilderAPI_MakeEdge_29: typeof BRepBuilderAPI_MakeEdge_29;
  BRepBuilderAPI_MakeEdge_30: typeof BRepBuilderAPI_MakeEdge_30;
  BRepBuilderAPI_MakeEdge_31: typeof BRepBuilderAPI_MakeEdge_31;
  BRepBuilderAPI_MakeEdge_32: typeof BRepBuilderAPI_MakeEdge_32;
  BRepBuilderAPI_MakeEdge_33: typeof BRepBuilderAPI_MakeEdge_33;
  BRepBuilderAPI_MakeEdge_34: typeof BRepBuilderAPI_MakeEdge_34;
  BRepBuilderAPI_MakeEdge_35: typeof BRepBuilderAPI_MakeEdge_35;
  BRepBuilderAPI_Command: typeof BRepBuilderAPI_Command;
  BRepBuilderAPI_TransitionMode: BRepBuilderAPI_TransitionMode;
  BRepBuilderAPI_Transform: typeof BRepBuilderAPI_Transform;
  BRepBuilderAPI_Transform_1: typeof BRepBuilderAPI_Transform_1;
  BRepBuilderAPI_Transform_2: typeof BRepBuilderAPI_Transform_2;
  BRepBuilderAPI_MakeFace: typeof BRepBuilderAPI_MakeFace;
  BRepBuilderAPI_MakeFace_1: typeof BRepBuilderAPI_MakeFace_1;
  BRepBuilderAPI_MakeFace_2: typeof BRepBuilderAPI_MakeFace_2;
  BRepBuilderAPI_MakeFace_3: typeof BRepBuilderAPI_MakeFace_3;
  BRepBuilderAPI_MakeFace_4: typeof BRepBuilderAPI_MakeFace_4;
  BRepBuilderAPI_MakeFace_5: typeof BRepBuilderAPI_MakeFace_5;
  BRepBuilderAPI_MakeFace_6: typeof BRepBuilderAPI_MakeFace_6;
  BRepBuilderAPI_MakeFace_7: typeof BRepBuilderAPI_MakeFace_7;
  BRepBuilderAPI_MakeFace_8: typeof BRepBuilderAPI_MakeFace_8;
  BRepBuilderAPI_MakeFace_9: typeof BRepBuilderAPI_MakeFace_9;
  BRepBuilderAPI_MakeFace_10: typeof BRepBuilderAPI_MakeFace_10;
  BRepBuilderAPI_MakeFace_11: typeof BRepBuilderAPI_MakeFace_11;
  BRepBuilderAPI_MakeFace_12: typeof BRepBuilderAPI_MakeFace_12;
  BRepBuilderAPI_MakeFace_13: typeof BRepBuilderAPI_MakeFace_13;
  BRepBuilderAPI_MakeFace_14: typeof BRepBuilderAPI_MakeFace_14;
  BRepBuilderAPI_MakeFace_15: typeof BRepBuilderAPI_MakeFace_15;
  BRepBuilderAPI_MakeFace_16: typeof BRepBuilderAPI_MakeFace_16;
  BRepBuilderAPI_MakeFace_17: typeof BRepBuilderAPI_MakeFace_17;
  BRepBuilderAPI_MakeFace_18: typeof BRepBuilderAPI_MakeFace_18;
  BRepBuilderAPI_MakeFace_19: typeof BRepBuilderAPI_MakeFace_19;
  BRepBuilderAPI_MakeFace_20: typeof BRepBuilderAPI_MakeFace_20;
  BRepBuilderAPI_MakeFace_21: typeof BRepBuilderAPI_MakeFace_21;
  BRepBuilderAPI_MakeFace_22: typeof BRepBuilderAPI_MakeFace_22;
  Handle_Geom_BezierCurve: typeof Handle_Geom_BezierCurve;
  Handle_Geom_BezierCurve_1: typeof Handle_Geom_BezierCurve_1;
  Handle_Geom_BezierCurve_2: typeof Handle_Geom_BezierCurve_2;
  Handle_Geom_BezierCurve_3: typeof Handle_Geom_BezierCurve_3;
  Handle_Geom_BezierCurve_4: typeof Handle_Geom_BezierCurve_4;
  Geom_BezierCurve: typeof Geom_BezierCurve;
  Geom_BezierCurve_1: typeof Geom_BezierCurve_1;
  Geom_BezierCurve_2: typeof Geom_BezierCurve_2;
  Geom_TrimmedCurve: typeof Geom_TrimmedCurve;
  Handle_Geom_TrimmedCurve: typeof Handle_Geom_TrimmedCurve;
  Handle_Geom_TrimmedCurve_1: typeof Handle_Geom_TrimmedCurve_1;
  Handle_Geom_TrimmedCurve_2: typeof Handle_Geom_TrimmedCurve_2;
  Handle_Geom_TrimmedCurve_3: typeof Handle_Geom_TrimmedCurve_3;
  Handle_Geom_TrimmedCurve_4: typeof Handle_Geom_TrimmedCurve_4;
  Geom_CylindricalSurface: typeof Geom_CylindricalSurface;
  Geom_CylindricalSurface_1: typeof Geom_CylindricalSurface_1;
  Geom_CylindricalSurface_2: typeof Geom_CylindricalSurface_2;
  Geom_BSplineCurve: typeof Geom_BSplineCurve;
  Geom_BSplineCurve_1: typeof Geom_BSplineCurve_1;
  Geom_BSplineCurve_2: typeof Geom_BSplineCurve_2;
  Handle_Geom_BSplineCurve: typeof Handle_Geom_BSplineCurve;
  Handle_Geom_BSplineCurve_1: typeof Handle_Geom_BSplineCurve_1;
  Handle_Geom_BSplineCurve_2: typeof Handle_Geom_BSplineCurve_2;
  Handle_Geom_BSplineCurve_3: typeof Handle_Geom_BSplineCurve_3;
  Handle_Geom_BSplineCurve_4: typeof Handle_Geom_BSplineCurve_4;
  Geom_Surface: typeof Geom_Surface;
  Handle_Geom_Surface: typeof Handle_Geom_Surface;
  Handle_Geom_Surface_1: typeof Handle_Geom_Surface_1;
  Handle_Geom_Surface_2: typeof Handle_Geom_Surface_2;
  Handle_Geom_Surface_3: typeof Handle_Geom_Surface_3;
  Handle_Geom_Surface_4: typeof Handle_Geom_Surface_4;
  Handle_Geom_Curve: typeof Handle_Geom_Curve;
  Handle_Geom_Curve_1: typeof Handle_Geom_Curve_1;
  Handle_Geom_Curve_2: typeof Handle_Geom_Curve_2;
  Handle_Geom_Curve_3: typeof Handle_Geom_Curve_3;
  Handle_Geom_Curve_4: typeof Handle_Geom_Curve_4;
  Geom_Curve: typeof Geom_Curve;
  Geom_BoundedCurve: typeof Geom_BoundedCurve;
  Geom_Geometry: typeof Geom_Geometry;
  Geom_BoundedSurface: typeof Geom_BoundedSurface;
  Geom_ElementarySurface: typeof Geom_ElementarySurface;
  Handle_Geom_BSplineSurface: typeof Handle_Geom_BSplineSurface;
  Handle_Geom_BSplineSurface_1: typeof Handle_Geom_BSplineSurface_1;
  Handle_Geom_BSplineSurface_2: typeof Handle_Geom_BSplineSurface_2;
  Handle_Geom_BSplineSurface_3: typeof Handle_Geom_BSplineSurface_3;
  Handle_Geom_BSplineSurface_4: typeof Handle_Geom_BSplineSurface_4;
  Geom_BSplineSurface: typeof Geom_BSplineSurface;
  Geom_BSplineSurface_1: typeof Geom_BSplineSurface_1;
  Geom_BSplineSurface_2: typeof Geom_BSplineSurface_2;
  Geom_ConicalSurface: typeof Geom_ConicalSurface;
  Geom_ConicalSurface_1: typeof Geom_ConicalSurface_1;
  Geom_ConicalSurface_2: typeof Geom_ConicalSurface_2;
  TopLoc_Location: typeof TopLoc_Location;
  TopLoc_Location_1: typeof TopLoc_Location_1;
  TopLoc_Location_2: typeof TopLoc_Location_2;
  TopLoc_Location_3: typeof TopLoc_Location_3;
  gp_Ax3: typeof gp_Ax3;
  gp_Ax3_1: typeof gp_Ax3_1;
  gp_Ax3_2: typeof gp_Ax3_2;
  gp_Ax3_3: typeof gp_Ax3_3;
  gp_Ax3_4: typeof gp_Ax3_4;
  gp_Dir: typeof gp_Dir;
  gp_Dir_1: typeof gp_Dir_1;
  gp_Dir_2: typeof gp_Dir_2;
  gp_Dir_3: typeof gp_Dir_3;
  gp_Dir_4: typeof gp_Dir_4;
  gp_Ax1: typeof gp_Ax1;
  gp_Ax1_1: typeof gp_Ax1_1;
  gp_Ax1_2: typeof gp_Ax1_2;
  gp_Elips: typeof gp_Elips;
  gp_Elips_1: typeof gp_Elips_1;
  gp_Elips_2: typeof gp_Elips_2;
  gp_Ax2: typeof gp_Ax2;
  gp_Ax2_1: typeof gp_Ax2_1;
  gp_Ax2_2: typeof gp_Ax2_2;
  gp_Ax2_3: typeof gp_Ax2_3;
  gp_Vec: typeof gp_Vec;
  gp_Vec_1: typeof gp_Vec_1;
  gp_Vec_2: typeof gp_Vec_2;
  gp_Vec_3: typeof gp_Vec_3;
  gp_Vec_4: typeof gp_Vec_4;
  gp_Vec_5: typeof gp_Vec_5;
  gp_Circ2d: typeof gp_Circ2d;
  gp_Circ2d_1: typeof gp_Circ2d_1;
  gp_Circ2d_2: typeof gp_Circ2d_2;
  gp_Circ2d_3: typeof gp_Circ2d_3;
  gp_Dir2d: typeof gp_Dir2d;
  gp_Dir2d_1: typeof gp_Dir2d_1;
  gp_Dir2d_2: typeof gp_Dir2d_2;
  gp_Dir2d_3: typeof gp_Dir2d_3;
  gp_Dir2d_4: typeof gp_Dir2d_4;
  gp_Trsf: typeof gp_Trsf;
  gp_Trsf_1: typeof gp_Trsf_1;
  gp_Trsf_2: typeof gp_Trsf_2;
  gp_Circ: typeof gp_Circ;
  gp_Circ_1: typeof gp_Circ_1;
  gp_Circ_2: typeof gp_Circ_2;
  gp_Ax2d: typeof gp_Ax2d;
  gp_Ax2d_1: typeof gp_Ax2d_1;
  gp_Ax2d_2: typeof gp_Ax2d_2;
  gp_Vec2d: typeof gp_Vec2d;
  gp_Vec2d_1: typeof gp_Vec2d_1;
  gp_Vec2d_2: typeof gp_Vec2d_2;
  gp_Vec2d_3: typeof gp_Vec2d_3;
  gp_Vec2d_4: typeof gp_Vec2d_4;
  gp_Vec2d_5: typeof gp_Vec2d_5;
  gp_GTrsf2d: typeof gp_GTrsf2d;
  gp_GTrsf2d_1: typeof gp_GTrsf2d_1;
  gp_GTrsf2d_2: typeof gp_GTrsf2d_2;
  gp_GTrsf2d_3: typeof gp_GTrsf2d_3;
  gp_Elips2d: typeof gp_Elips2d;
  gp_Elips2d_1: typeof gp_Elips2d_1;
  gp_Elips2d_2: typeof gp_Elips2d_2;
  gp_Elips2d_3: typeof gp_Elips2d_3;
  gp_GTrsf: typeof gp_GTrsf;
  gp_GTrsf_1: typeof gp_GTrsf_1;
  gp_GTrsf_2: typeof gp_GTrsf_2;
  gp_GTrsf_3: typeof gp_GTrsf_3;
  gp_Cylinder: typeof gp_Cylinder;
  gp_Cylinder_1: typeof gp_Cylinder_1;
  gp_Cylinder_2: typeof gp_Cylinder_2;
  gp_Pnt: typeof gp_Pnt;
  gp_Pnt_1: typeof gp_Pnt_1;
  gp_Pnt_2: typeof gp_Pnt_2;
  gp_Pnt_3: typeof gp_Pnt_3;
  gp_Pnt2d: typeof gp_Pnt2d;
  gp_Pnt2d_1: typeof gp_Pnt2d_1;
  gp_Pnt2d_2: typeof gp_Pnt2d_2;
  gp_Pnt2d_3: typeof gp_Pnt2d_3;
  gp_XY: typeof gp_XY;
  gp_XY_1: typeof gp_XY_1;
  gp_XY_2: typeof gp_XY_2;
  gp_Trsf2d: typeof gp_Trsf2d;
  gp_Trsf2d_1: typeof gp_Trsf2d_1;
  gp_Trsf2d_2: typeof gp_Trsf2d_2;
  gp_XYZ: typeof gp_XYZ;
  gp_XYZ_1: typeof gp_XYZ_1;
  gp_XYZ_2: typeof gp_XYZ_2;
  TColStd_Array1OfInteger: typeof TColStd_Array1OfInteger;
  TColStd_Array1OfInteger_1: typeof TColStd_Array1OfInteger_1;
  TColStd_Array1OfInteger_2: typeof TColStd_Array1OfInteger_2;
  TColStd_Array1OfInteger_3: typeof TColStd_Array1OfInteger_3;
  TColStd_Array1OfInteger_4: typeof TColStd_Array1OfInteger_4;
  TColStd_Array1OfInteger_5: typeof TColStd_Array1OfInteger_5;
  TColStd_Array1OfReal: typeof TColStd_Array1OfReal;
  TColStd_Array1OfReal_1: typeof TColStd_Array1OfReal_1;
  TColStd_Array1OfReal_2: typeof TColStd_Array1OfReal_2;
  TColStd_Array1OfReal_3: typeof TColStd_Array1OfReal_3;
  TColStd_Array1OfReal_4: typeof TColStd_Array1OfReal_4;
  TColStd_Array1OfReal_5: typeof TColStd_Array1OfReal_5;
  TColStd_Array1OfBoolean: typeof TColStd_Array1OfBoolean;
  TColStd_Array1OfBoolean_1: typeof TColStd_Array1OfBoolean_1;
  TColStd_Array1OfBoolean_2: typeof TColStd_Array1OfBoolean_2;
  TColStd_Array1OfBoolean_3: typeof TColStd_Array1OfBoolean_3;
  TColStd_Array1OfBoolean_4: typeof TColStd_Array1OfBoolean_4;
  TColStd_Array1OfBoolean_5: typeof TColStd_Array1OfBoolean_5;
  STEPControl_Writer: typeof STEPControl_Writer;
  STEPControl_Writer_1: typeof STEPControl_Writer_1;
  STEPControl_Writer_2: typeof STEPControl_Writer_2;
  STEPControl_Reader: typeof STEPControl_Reader;
  STEPControl_Reader_1: typeof STEPControl_Reader_1;
  STEPControl_Reader_2: typeof STEPControl_Reader_2;
  STEPControl_StepModelType: STEPControl_StepModelType;
  BRepLib: typeof BRepLib;
  BRepPrimAPI_MakeTorus: typeof BRepPrimAPI_MakeTorus;
  BRepPrimAPI_MakeTorus_1: typeof BRepPrimAPI_MakeTorus_1;
  BRepPrimAPI_MakeTorus_2: typeof BRepPrimAPI_MakeTorus_2;
  BRepPrimAPI_MakeTorus_3: typeof BRepPrimAPI_MakeTorus_3;
  BRepPrimAPI_MakeTorus_4: typeof BRepPrimAPI_MakeTorus_4;
  BRepPrimAPI_MakeTorus_5: typeof BRepPrimAPI_MakeTorus_5;
  BRepPrimAPI_MakeTorus_6: typeof BRepPrimAPI_MakeTorus_6;
  BRepPrimAPI_MakeTorus_7: typeof BRepPrimAPI_MakeTorus_7;
  BRepPrimAPI_MakeTorus_8: typeof BRepPrimAPI_MakeTorus_8;
  BRepPrimAPI_MakeRevol: typeof BRepPrimAPI_MakeRevol;
  BRepPrimAPI_MakeRevol_1: typeof BRepPrimAPI_MakeRevol_1;
  BRepPrimAPI_MakeRevol_2: typeof BRepPrimAPI_MakeRevol_2;
  BRepPrimAPI_MakeOneAxis: typeof BRepPrimAPI_MakeOneAxis;
  BRepPrimAPI_MakeSphere: typeof BRepPrimAPI_MakeSphere;
  BRepPrimAPI_MakeSphere_1: typeof BRepPrimAPI_MakeSphere_1;
  BRepPrimAPI_MakeSphere_2: typeof BRepPrimAPI_MakeSphere_2;
  BRepPrimAPI_MakeSphere_3: typeof BRepPrimAPI_MakeSphere_3;
  BRepPrimAPI_MakeSphere_4: typeof BRepPrimAPI_MakeSphere_4;
  BRepPrimAPI_MakeSphere_5: typeof BRepPrimAPI_MakeSphere_5;
  BRepPrimAPI_MakeSphere_6: typeof BRepPrimAPI_MakeSphere_6;
  BRepPrimAPI_MakeSphere_7: typeof BRepPrimAPI_MakeSphere_7;
  BRepPrimAPI_MakeSphere_8: typeof BRepPrimAPI_MakeSphere_8;
  BRepPrimAPI_MakeSphere_9: typeof BRepPrimAPI_MakeSphere_9;
  BRepPrimAPI_MakeSphere_10: typeof BRepPrimAPI_MakeSphere_10;
  BRepPrimAPI_MakeSphere_11: typeof BRepPrimAPI_MakeSphere_11;
  BRepPrimAPI_MakeSphere_12: typeof BRepPrimAPI_MakeSphere_12;
  BRepPrimAPI_MakeCylinder: typeof BRepPrimAPI_MakeCylinder;
  BRepPrimAPI_MakeCylinder_1: typeof BRepPrimAPI_MakeCylinder_1;
  BRepPrimAPI_MakeCylinder_2: typeof BRepPrimAPI_MakeCylinder_2;
  BRepPrimAPI_MakeCylinder_3: typeof BRepPrimAPI_MakeCylinder_3;
  BRepPrimAPI_MakeCylinder_4: typeof BRepPrimAPI_MakeCylinder_4;
  BRepPrimAPI_MakeSweep: typeof BRepPrimAPI_MakeSweep;
  BRepPrimAPI_MakePrism: typeof BRepPrimAPI_MakePrism;
  BRepPrimAPI_MakePrism_1: typeof BRepPrimAPI_MakePrism_1;
  BRepPrimAPI_MakePrism_2: typeof BRepPrimAPI_MakePrism_2;
  BRepPrimAPI_MakeBox: typeof BRepPrimAPI_MakeBox;
  BRepPrimAPI_MakeBox_1: typeof BRepPrimAPI_MakeBox_1;
  BRepPrimAPI_MakeBox_2: typeof BRepPrimAPI_MakeBox_2;
  BRepPrimAPI_MakeBox_3: typeof BRepPrimAPI_MakeBox_3;
  BRepPrimAPI_MakeBox_4: typeof BRepPrimAPI_MakeBox_4;
  BRepPrimAPI_MakeBox_5: typeof BRepPrimAPI_MakeBox_5;
  BRepPrimAPI_MakeRevolution: typeof BRepPrimAPI_MakeRevolution;
  BRepPrimAPI_MakeRevolution_1: typeof BRepPrimAPI_MakeRevolution_1;
  BRepPrimAPI_MakeRevolution_2: typeof BRepPrimAPI_MakeRevolution_2;
  BRepPrimAPI_MakeRevolution_3: typeof BRepPrimAPI_MakeRevolution_3;
  BRepPrimAPI_MakeRevolution_4: typeof BRepPrimAPI_MakeRevolution_4;
  BRepPrimAPI_MakeRevolution_5: typeof BRepPrimAPI_MakeRevolution_5;
  BRepPrimAPI_MakeRevolution_6: typeof BRepPrimAPI_MakeRevolution_6;
  BRepPrimAPI_MakeRevolution_7: typeof BRepPrimAPI_MakeRevolution_7;
  BRepPrimAPI_MakeRevolution_8: typeof BRepPrimAPI_MakeRevolution_8;
  TopExp_Explorer: typeof TopExp_Explorer;
  TopExp_Explorer_1: typeof TopExp_Explorer_1;
  TopExp_Explorer_2: typeof TopExp_Explorer_2;
  BRepFilletAPI_MakeChamfer: typeof BRepFilletAPI_MakeChamfer;
  BRepFilletAPI_MakeFillet: typeof BRepFilletAPI_MakeFillet;
  BRepFilletAPI_LocalOperation: typeof BRepFilletAPI_LocalOperation;
  Bnd_Box2d: typeof Bnd_Box2d;
  Bnd_Box: typeof Bnd_Box;
  Bnd_Box_1: typeof Bnd_Box_1;
  Bnd_Box_2: typeof Bnd_Box_2;
  Bnd_OBB: typeof Bnd_OBB;
  Bnd_OBB_1: typeof Bnd_OBB_1;
  Bnd_OBB_2: typeof Bnd_OBB_2;
  Bnd_OBB_3: typeof Bnd_OBB_3;
  Geom2dAPI_ProjectPointOnCurve: typeof Geom2dAPI_ProjectPointOnCurve;
  Geom2dAPI_ProjectPointOnCurve_1: typeof Geom2dAPI_ProjectPointOnCurve_1;
  Geom2dAPI_ProjectPointOnCurve_2: typeof Geom2dAPI_ProjectPointOnCurve_2;
  Geom2dAPI_ProjectPointOnCurve_3: typeof Geom2dAPI_ProjectPointOnCurve_3;
  Geom2dAPI_PointsToBSpline: typeof Geom2dAPI_PointsToBSpline;
  Geom2dAPI_PointsToBSpline_1: typeof Geom2dAPI_PointsToBSpline_1;
  Geom2dAPI_PointsToBSpline_2: typeof Geom2dAPI_PointsToBSpline_2;
  Geom2dAPI_PointsToBSpline_3: typeof Geom2dAPI_PointsToBSpline_3;
  Geom2dAPI_PointsToBSpline_4: typeof Geom2dAPI_PointsToBSpline_4;
  Geom2dAPI_PointsToBSpline_5: typeof Geom2dAPI_PointsToBSpline_5;
  Geom2dAPI_PointsToBSpline_6: typeof Geom2dAPI_PointsToBSpline_6;
  Geom2dAPI_InterCurveCurve: typeof Geom2dAPI_InterCurveCurve;
  Geom2dAPI_InterCurveCurve_1: typeof Geom2dAPI_InterCurveCurve_1;
  Geom2dAPI_InterCurveCurve_2: typeof Geom2dAPI_InterCurveCurve_2;
  Geom2dAPI_InterCurveCurve_3: typeof Geom2dAPI_InterCurveCurve_3;
  TopTools_ListOfShape: typeof TopTools_ListOfShape;
  TopTools_ListOfShape_1: typeof TopTools_ListOfShape_1;
  TopTools_ListOfShape_2: typeof TopTools_ListOfShape_2;
  TopTools_ListOfShape_3: typeof TopTools_ListOfShape_3;
  Adaptor3d_Surface: typeof Adaptor3d_Surface;
  Adaptor3d_Curve: typeof Adaptor3d_Curve;
  BRepAdaptor_Curve: typeof BRepAdaptor_Curve;
  BRepAdaptor_Curve_1: typeof BRepAdaptor_Curve_1;
  BRepAdaptor_Curve_2: typeof BRepAdaptor_Curve_2;
  BRepAdaptor_Curve_3: typeof BRepAdaptor_Curve_3;
  BRepAdaptor_Surface: typeof BRepAdaptor_Surface;
  BRepAdaptor_Surface_1: typeof BRepAdaptor_Surface_1;
  BRepAdaptor_Surface_2: typeof BRepAdaptor_Surface_2;
  BRepAdaptor_CompCurve: typeof BRepAdaptor_CompCurve;
  BRepAdaptor_CompCurve_1: typeof BRepAdaptor_CompCurve_1;
  BRepAdaptor_CompCurve_2: typeof BRepAdaptor_CompCurve_2;
  BRepAdaptor_CompCurve_3: typeof BRepAdaptor_CompCurve_3;
  Adaptor2d_Curve2d: typeof Adaptor2d_Curve2d;
  Standard_Transient: typeof Standard_Transient;
  Standard_Transient_1: typeof Standard_Transient_1;
  Standard_Transient_2: typeof Standard_Transient_2;
  ChFi3d_FilletShape: ChFi3d_FilletShape;
  BRepFill_TypeOfContact: BRepFill_TypeOfContact;
  Message_ProgressRange: typeof Message_ProgressRange;
  Message_ProgressRange_1: typeof Message_ProgressRange_1;
  Message_ProgressRange_2: typeof Message_ProgressRange_2;
  GProp_GProps: typeof GProp_GProps;
  GProp_GProps_1: typeof GProp_GProps_1;
  GProp_GProps_2: typeof GProp_GProps_2;
  Extrema_ExtAlgo: Extrema_ExtAlgo;
};

declare function init(): Promise<OpenCascadeInstance>;

export default init;
