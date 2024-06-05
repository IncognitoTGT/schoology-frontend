import { getSchoology } from "@/lib/schoology"

export default async function Index(){
    const schoology = getSchoology()
    const {school} = (await schoology("/schools"))
    return <main className="flex h-full justify-center items-center">
        <p>Your district/school is {school[0].title}</p>
    </main>
}