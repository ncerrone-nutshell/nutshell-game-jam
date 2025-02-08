import { MainComputer } from "./main-computer"

export function OfficeSpace() {
    return (
        <>
            <group>
                <ambientLight />
                <pointLight position={[1, 1, 1]} />
                <MainComputer />
            </group>
        </>
    )
}
